import {model,Schema} from 'mongoose'

const courseSchema=new Schema({
    title:{
        type:String,
        required:[true,"Title is requires"],
        minLength:[8,'Title must be at least 8 characters'],
        maxLength:[59,'Title should be less than 60 charcters'],
        trim :true
    },
    description:{
        type:String,
        required:[true,"description is requires"],
        minLength:[8,'description must be at least 8 characters'],
        maxLength:[200,'description should be less than 200 charcters'],
        trim :true

    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    thumbnail:{
        public_id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        }
    },
    lectures:[{
        title:String,
        description:String,
        lecture:{
            public_id:{
                type:String,
                required:true
            },
            secure_url:{
                type:String,
                required:true
            }
        }
    }],
    numberOflectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String,
        required:true
    }
},{
    timestaamps:true
});

const Course=new model('Course', courseSchema);

export default Course;