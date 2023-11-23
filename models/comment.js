import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
    },
    subcomments: [
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcomments',
     },
    ],
    date:{
        type: Date,
        default: Date.now(),
    },
})

const Comments=mongoose.model("Comments",commentSchema);
export default Comments;