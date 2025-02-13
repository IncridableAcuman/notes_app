const jwt=require('jsonwebtoken');
const Token=require('../models/token.model');
class TokenServices{

    generateTokens(payload){
        const accessToken=jwt.sign(payload,process.env.JWT_ACCESS_KEY || "access",{expiresIn:'15'});
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH_KEY || 'refresh',{expiresIn:'30d'});
        return {accessToken,refreshToken};
    }
    async saveToken(userId,refreshToken){
        const existUser=await Token.findOne({user:userId});
        if(existUser){
            existUser.refreshToken=refreshToken;
            return existUser.save();
        }
        const token=await Token.create({user:userId,refreshToken});
        return token;
    }
    async findToken(refreshToken){
        return await Token.findOne({refreshToken});
    }
    async removeToken(refreshToken){
        return await Token.findOneAndDelete({refreshToken});
    }
    validateRefreshToken(token){
        try {
            return jwt.verify(token,process.env.JWT_REFRESH_KEY|| 'refresh');  
        } catch (error) {
            return null
        }

    }
    validateAccessToken(token){
        try {
         return jwt.verify(token,process.env.JWT_ACCESS_KEY || 'access');   
        } catch (error) {
            return null;
        }
        
    }
}
module.exports=new TokenServices();