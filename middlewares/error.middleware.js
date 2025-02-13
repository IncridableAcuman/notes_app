const BaseErrors = require("../errors/base.error");
module.exports=function(err,req,res,next){
    try {
      if(err instanceof BaseErrors){
        return res.status(err.status).json({message:err.message,errors:err.errors});
      }  
    } catch (error) {
       return res.status(500).json({message:"Internal server error"}); 
    }

}