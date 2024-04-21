import  pkg  from  "jsonwebtoken";
const jwt=pkg
import appError from  "../utilis/appError.js";

const isLoggedIn=function(req,res,next){
 const {token}=req.cookies;
    if(!token){
        return next(new appError("UNauthicated,please login",401))
    }

    const tokenDetails=jwt.verify(token,process.env.JWT_SECRET);
    if(!tokenDetails){
        return next(new appError("UNauthicated,please login",401))
    }
    req.user=tokenDetails;

    next();

}

const authorisedRoles=(...roles)=>(req,res,next)=>{
    const currentRole=req.user.role;
    if(!roles.includes(currentRole)){
        return next(
            new appError('You do not have permission',403)
        )
    }
    
    next();
}
export {
    isLoggedIn,
    authorisedRoles
}