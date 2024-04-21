import  appError  from  "../utilis/appError.js";
import User from  "../models/user.model.js"
import cloudinary from "cloudinary";
import fs from "fs/promises"
const cookieoptions={
    secure:true,
    maxAge:7*24*60*60*1000,
    httpOnly:true
}



const register=async (req,res,next)=>{
    const {fullname,email,password}=req.body;
    if(!fullname || !email || !password){
        return next(new appError("All fields are required",400));
    }
    const userExists=await User.findOne({email});
    if(userExists){
        return next(new appError("email already exists",400));
            
    }

    const user =await User.create({
        fullname,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fbuffer.com%2Flibrary%2Ffree-images%2F&psig=AOvVaw2JGh9Lqsltu08C7NQPzv4a&ust=1711462999528000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODpidLOj4UDFQAAAAAdAAAAABAE"
        }
    });

    if(!user){
        return next(new appError("User registration failed ,please try again later",400))
    }
    //  TODO UPLOAD USER PICTURE
    console.log("file details",JSON.stringify(req.file))
    if(req.file){
        try{
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lmsbackend",
                width:250,
                height:250,
                gravity:"faces",
                crop:'fill'

        });

        if(result){
            user.avatar.public_id=result.public_id;
            user.avatar.secure_url=result.secure_url;
            //remove file from local storage
            fs.rm(`uploads/${req.file.filename}`);


        }


        }catch(e){
            return next(new appError(e.message||"file not uploaded ,please try again later",400))
        }

    }
    await user.save();
    //todo get jwt token in cookie
    user.password=undefined;
    res.status(200).send({
        success:true,
        message:"user registered successfully",
        user
    })
}
const logout=(req,res,next)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
}
const login=async (req,res,next)=>{
   const {email,password}=req.body;
   if(!email||!password){
    return next(new appError("all fileds are required",400));
   }
   const user=await User.findOne({
    email
   }).select("+password");


   if(!user||!user.comparePassword(password)){ //todo
    return next(new appError("Email or password do nor match",400));
   }

   const token =await user.generateJWTToken();

   user.password=undefined;
   
res.cookie('token',token,cookieoptions)
res.status(201).json({
    success:true,
    message:"User registered successfully",
    user
})
}
const me=(req,res)=>{
    const user=User.findById(req.user.id);
    res.status(200).json({
        success:true,
        message:"user details",
        user
    })
}


export  {
    register,
    logout,
    login,
    me
}