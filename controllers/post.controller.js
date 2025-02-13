const postService = require("../services/post.service");

class PostController{

    async createPost(req,res,next){
        try {
          const {title,description}=req.body;
          const {id}=req.user;
          const post=await postService.createPost(title,description,id);
          return res.json(post);  
        } catch (error) {
            next(error);
        }
    }
    async getPost(req,res,next){
        try {
            const {id}=req.params;
            const post=await postService.getPost(id);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }
    async getPosts(req,res,next){
        try {
           const post=await postService.getPosts();
           return res.json(post); 
        } catch (error) {
            next(error);
        }
    }
    async updatePost(req,res,next){
        try {
            const {id}=req.params;
            const {title,description}=req.body;
            const post=await postService.updatePost(id,title,description);
            return res.json(post);
            
        } catch (error) {
            next(error);
        }
    }
    async deletePost(req,res,next){
        try {
           const {id}=req.params;
           const post=await postService.deletePost(id);
           return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async addRememberToTags(req,res,next){
        try {
            const {tag}=req.body;
            const {id}=req.params;
            const post=await postService.addRememberToTags(id,tag);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async removeRememberToTags(req,res,next){
        try {
            const {tag}=req.body;
            const {id}=req.params;
            const post=await postService.removeRememberToTags(id,tag);
            return res.json(post);
        } catch (error) {
            next(error);
        }
    }
    async getRemeberFromTags(req,res,next){
        try {
            const {tag}=req.query;
            const {id}=req.user;
            const post=await postService.getRemeberFromTags(id,tag);
            return res.json(post);

        } catch (error) {
            next(error);
        }
    }
}
module.exports=new PostController();