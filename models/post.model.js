const {Schema,model}=require('mongoose');

const postSchema=new Schema({

    title:{
        type:String,
        required:true,
        minlength:3,
    },
    description:{
        type:String,
        required:true,
        minlength:3,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    tags:{
        type:[String],
        default:[],
    },
    isPinned:{
        type:Boolean,
        default:false,
    },
    isArchived:{
        type:Boolean,
        default:false,
    },
    color:{
        type:String,
        default:"#ffffff",
    }

},{timestamps:true});
const Post=model('Post',postSchema);
module.exports=Post;