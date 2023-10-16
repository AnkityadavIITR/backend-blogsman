import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    photo:
        {
            public_id:{
                type:String,
            },url:{
                type:String,
            }
        }
    ,
    posts: [
        { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Posts' 
            }
        ]
})
const User=mongoose.model("Users",userSchema);
export default User;