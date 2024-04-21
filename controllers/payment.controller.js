import app from "../app.js"
import { razorpay } from "../server.js"
import appError from "../utilis/appError.js"

export const getRazorpayApiKey=async(req,res,next)=>{
  try {
    res.status(200).json({
      success:true,
      message:'Razorpay api key',
      key:process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    return next(new appError(error.message,500))
  }
}




export const buySubscription=async(req,res,next)=>{
  try {
    const {id}=req.user;
    const user=await User.findById(id);
    if(!user){
      return next(
        new appError('Unautjorised,please login',500)
      )
    }
    if(user.role=='ADMIN'){
      return next(
        new appError('Admin cannot buy a subscription',400)
      )
    }

    const subscription=await razorpay.subscriptions.create({
      plan_id:process.env.RAZORPAY_PLAN_ID,
      customer_notify:1
    });

    //update user model with the subcription
    user.subscription.id=subscription.id;
    user.subscription.status=subscription.status;

    await user.save()
    res.status(200).json({
      success:true,
      message:'subcribed Successfully'
    })

  } catch (error) {
    return next(new appError(error.message,500))
  }
}


export const verifySubscription=async(req,res,next)=>{
  try {
    
  } catch (error) {
    return next(new appError(error.message,500))
  }
}


export const cancelSubscription=async(req,res,next)=>{
  try {
    
  } catch (error) {
    return next(new appError(error.message,500))
  }
}


export const getAllpayments=async(req,res,next)=>{
  try {
    
  } catch (error) {
    return next(new appError(error.message,500))
  }
}
