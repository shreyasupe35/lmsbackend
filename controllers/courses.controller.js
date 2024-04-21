import Course from "../models/course.model.js"
import appError from "../utilis/appError.js"

export const getAllCourses=async(req,res,next)=>{


    try {

        const courses=await Course.find({}).select('-lecture');
        res.status(200).json({
            success:true,
            messafe:"All courses",
            courses
        })
        
    } catch (e) {
        return next(new appError(e.message,500))
    }
}