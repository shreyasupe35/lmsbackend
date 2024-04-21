import mongoose from "mongoose";

mongoose.set('strictQuery',false)
const connectDB=async ()=>{
    try{
        const {connection}=await mongoose.connect(
            process.env.MONGO_URI||'mongodb://0.0.0.0/lmsbackend'
        );
        if(connection){
            console.log("Connection to mongodb",connection.host);
        }

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;