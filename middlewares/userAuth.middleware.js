const BaseErrors = require("../errors/base.error");
const tokenService = require("../services/token.service");

module.exports=(req,res,next)=>{
    try {
        const {refreshToken}=req.cookies;
        if(!refreshToken){
            next(BaseErrors.Unauthorized());
        }
        const userData=tokenService.validateRefreshToken(refreshToken);
        if(!userData){
            next(BaseErrors.Unauthorized());
        }
        req.user=userData;
        next();
    } catch (error) {
        next(BaseErrors.Unauthorized());
    }
}