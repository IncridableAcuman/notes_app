const bcrypt=require('bcrypt');
const UserDto=require('../dtos/user.dto');
const User=require('../models/user.model');
const tokenService=require('./token.service');
const BaseError=require('../errors/base.error');
class AuthServices{

    async signup(name,email,password){
        if(!name || !email || !password){
            throw BaseError.BadRequest("All information must be complete!");
        }
        const existUser=await User.findOne({email});
        if(existUser){
            throw BaseError.BadRequest("User already exist!");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword});
        const userDto=new UserDto(user);
        const tokens=tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {user:userDto,...tokens}
    }
    async login(email,password){
        if(!email || !password){
            throw BaseError.BadRequest("All information must be complete!");
        }
        const existUser=await User.findOne({email});
        if(!existUser){
            throw BaseError.NotFound("User not found!");
        }
        const isPassword=await bcrypt.compare(password,existUser.password);
        if(!isPassword){
            throw BaseError.BadRequest("Password Incorrect!");
        }
        const userDto=new UserDto(existUser);
        const tokens=tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {user:userDto,...tokens}
    }
    async logout(refreshToken){
        return await tokenService.removeToken(refreshToken);
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw BaseError.Unauthorized("User not Authorization!");
        }
        const userPayload=tokenService.validateRefreshToken(refreshToken);
        const tokenDb=await tokenService.findToken(refreshToken);
        if(!userPayload || !tokenDb){
            throw BaseError.Unauthorized("Bad authorized!");
        }
        const user=await User.findById(userPayload.id);
        const userDto=new UserDto(user);
        const tokens=tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {user:userDto,...tokens}
    }
    async getUsers(){
        return await User.find();
    }
    async getUser(id){
        if(!id || id.length<24){
            throw BaseError.NotFound("User not found!");
        }
        return await User.findById(id);
    }
    async getUserData(id){
        if(!id || id.length<24){
            throw BaseError.NotFound("User not found!");
        }
        return await User.findById(id);
    }
}
module.exports=new AuthServices();