const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:150,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024,
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRom1dDw4j3-7q2l7hFpioBahr-CTZVBUcUgA&s",
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isActivated:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
const User=model('User',userSchema);
module.exports=User;