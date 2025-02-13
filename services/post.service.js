const PostDTO = require("../dtos/post.dto");
const Post = require("../models/post.model");
const BaseError = require('../errors/base.error');
class PostService{

    async createPost(title,description,id){
        if(!title || !description || !id){
            throw BaseError.BadRequest("All fields are required");
        }
        const post=await Post.create({title,description,user:id});
        const postDto=new PostDTO(post);
        return postDto;
    }
    async getPost(id){
        if(!id || id.length<24){
            throw BaseError.BadRequest("Invalid id");
        }
        const post=await Post.findById(id);
        if(!post){
            throw BaseError.NotFound("Post not found");
        }
        const postDto=new PostDTO(post);
        return postDto;
    }
    async getPosts(){
        const posts=await Post.find();
        const postsDto=posts.map(post=>new PostDTO(post));
        return postsDto;
    }
    async updatePost(id,title,description){
        if(!id || id.length<24){
            throw BaseError.BadRequest("Invalid id");
        }
        if(!title || !description){
            throw BaseError.BadRequest("Title and description are required");
        }
        const post=await Post.findByIdAndUpdate(id,{title,description},{new:true});
        const postDto=new PostDTO(post);
        return postDto;
    }
    async deletePost(id){
        if(!id || id.length<24){
            throw BaseError.BadRequest("Invalid id");
        }
        const post=await Post.findByIdAndDelete(id);
        const postDto=new PostDTO(post);
        return postDto;
    }

    async addRememberToTags(id,tag){
        if(!id || id.length<24 || !tag){
            throw BaseError.NotFound("Post not found!");
        }
        const post=await Post.findById(id);
        if(!post){
            throw BaseError.NotFound("Post not found!");
        }
        if(!post.tags.includes(tag)){
            post.tags.push(tag);
            await post.save();
        }
        const postDto=new PostDTO(post);
        return postDto;
    }

    async removeRememberToTags(id,tag){
        if(!id || id.length<24 || !tag){
            throw BaseError.NotFound("Post not found!");
        } 
        const post=await Post.findById(id);
        if(!post){
            throw BaseError.NotFound("Post not found!");
        }
        post.tags=post.tags.filter(t=>t !==tag);
        await post.save();
        const postDto=new PostDTO(post);
        return postDto;
    }

    async getRemeberFromTags(id,tag){
        if(!id || id.length<24 || !tag){
            throw BaseError.NotFound("Post not found!");
        } 
        const post=await Post.find({user:id,tags:{$in:[tag]}});
        if(post.length === 0){
            throw BaseError.NotFound("No posts found for search by tag");
        }
        const postDto=new PostDTO(post);
        return post.map(p=>new PostDTO(p));
    }
    
}
module.exports=new PostService();