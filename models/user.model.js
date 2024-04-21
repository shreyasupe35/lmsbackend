import {Schema,model} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema=new Schema({
    fullname:{
        type:String,
        required:[true,"Fullname is required"],
        minLength:[5,"Name must be atleast 5 character"],
        maxLength:[50,"Name must be maximun 50 character"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        // match:['^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$','Please fill the valid email']
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        unique:true,
        minLength:8,
        select:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    avatar:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
});

userSchema.methods={
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);
    },
    generateJWTToken: function(){
        return jwt.sign(
            {
                id:this._id,role:this.role,email:this.email,subscription:this.subscription
            },process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    }
}




const User=model('user',userSchema)
export default User;