import Post from "../models/post.js";
import User from "../models/user.js";

export const getAllPost=async (req,res)=>{

    //sending the store posts in bd
    try {
      const allPosts = await Post.find({});
      res.json({
        success:"true",
        posts:allPosts
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching posts from the database" });
    }
}

export const getPostById=async(req,res)=>{
  
    const Id=parseInt(req.params.id);
    try{
      const search=await Post.findOne({id:Id});
      console.log(search);
      const {id,title,content,author,date}=search;//destructure the first json of search array
  
      const response={
        id:id,
        title:title,
        content:content,
        author:author,
        date:date
      }
      console.log(response);
      res.json(response);
  
    }catch(err){
      console.log("error in getting");
      res.json({error:"can't get"})
    }
  }

  export const addPost=async(req,res)=>{
    const {title,content,author}=req.body;
    console.log("user :",req.user);
    try{
      const newPost=await Post.create({
        title:title,
        content:content,
        author:author,
        user:req.user._id,
      })
      const userData=req.user;
      console.log(newPost);
      console.log(newPost._id);
      userData.posts.push(newPost._id);
      await userData.save();
      console.log(userData);
      
      res.json({
        success:true,
        message:"post created"
      })
    }catch(err){
      console.log(err);
      console.log("error in getting");
      res.json({error:"can't get"})
    }
  }

  export const patchPost=async(req,res)=>{
  
    const Id=parseInt(req.params.id);
    try{
       await Post.findOneAndUpdate(
        {id:Id},
        {$set:{
          title:req.body.title,
          content: req.body.content,
          author:req.body.author
        }}
        );
        res.status(200).json({success:true,message:"success update"});
    }catch(err){
      console.log(err);
      res.json({message:"can't patch, not available"})
    }
  
  }

  export const getUserpost=async(req,res)=>{
    
  }

  export const deletePost=async(req,res)=>{
    const Id=parseInt(req.params.id);
    console.log(Id);
    try{
       await Post.findOneAndDelete(
        {id:Id}
        );
        res.status(200).json({message:"success update"});
    }catch(err){
      console.log(err);
      res.json({message:"can't patch, not available"})
    }
  }