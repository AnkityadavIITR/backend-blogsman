import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    title:{
      type:String,
      require:true
    },
    content:{
      type:String,
      require:true
    },
    photo:{
        public_id:{
            type:String,
        },url:{
            type:String,
        }
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
      },
    ],
    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comments',
    }
    ],
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required:true
    },
    date:{
      type:Date,
      default:Date.now()
    },

  })
  
  
const Post=mongoose.model("Posts",postSchema);
export default Post;
