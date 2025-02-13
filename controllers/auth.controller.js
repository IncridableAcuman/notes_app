const BaseErrors = require('../errors/base.error');
const authService = require('../services/auth.service');
const {validationResult}=require('express-validator')
class AuthController{

    async signup(req,res,next){
        try {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                next(BaseErrors.BadRequest("Error with validation",errors.array()));
            }
           const {name,email,password}=req.body;
           const user=await authService.signup(name,email,password);
           res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
           return res.json(user); 
        } catch (error) {
            console.log(error)
        }
    }
    async login(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await authService.login(email,password);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async logout(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.refresh(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async refresh(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.refresh(refreshToken);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user); 
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req,res,next){
        try {
            const users=await authService.getUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
    async getUser(req,res,next){
        try {
            const {id}=req.params;
            const user=await authService.getUser(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async getUserData(req,res,next){
        try {
            const {id}=req.user;
            const user=await authService.getUserData(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new AuthController();