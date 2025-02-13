const tokenService = require("../services/token.service");
const BaseError = require('../errors/base.error');
module.exports=function(req,res,next){
    try {
        const authorization=req.headers.authorization;
        if(!authorization){
            return next(BaseError.Unauthorized());
        }
        const accessToken=authorization.split(" ")[1];
        if(!accessToken){
            return  next(BaseError.Unauthorized());
        }
        const userData=tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(BaseError.Unauthorized());
        }
        req.user=userData;
        next();
    } catch (error) {
        return next(BaseError.Unauthorized());
    }
}