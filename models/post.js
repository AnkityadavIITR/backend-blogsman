import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required:true
    },
    date:{
      type:Date,
      default:Date.now()
    }
  })
  
  
const Post=mongoose.model("Posts",postSchema);
export default Post;
