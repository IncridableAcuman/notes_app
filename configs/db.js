const mongoose=require('mongoose');
module.exports=function(){
mongoose.connect('mongodb://localhost/evernote').then(()=>{
    console.log("MongoDB connected successfully");
}).catch((er)=>{
    console.log("MongoDB connection failed! Something went wrong",er);
})
}