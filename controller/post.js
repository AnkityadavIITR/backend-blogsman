import Post from "../models/post.js";
import User from "../models/user.js";
import { getDataUri } from "../utils/dataUri.js";
import {v2 as cloudinary} from "cloudinary"

export const getAllPost=async (req,res)=>{

    //sending the store posts in bd
    try {
      const allPosts = await Post.find({}).populate('user');
      res.json({
        success:true,
        posts:allPosts
      });
    } catch (error) {
      res.status(500).json({success:false, error: "Error fetching posts from the database" });
    }
}

export const getPostById=async(req,res)=>{
  
    const Id=req.params.id;
    console.log("id",Id);
    try{
      const search=await Post.findById(Id);
      const {id,title,content,likes,date}=search;//destructure the first json of search array
  
      const response={
        id:id,
        title:title,
        content:content,
        likes:likes,
        date:date
      }
      res.json({
        success:true,
        response
      });
  
    }catch(err){
      // console.log("error in getting");
      console.log(err);
      res.json({
        success:false,error:"can't get"})
    }
  }

  export const addPost=async(req,res)=>{
    const {title,content}=req.body;
    console.log(req.file);
    const file=req.file;
    const fileUri=getDataUri(file);
    //sending the file to cloud
    const mycloud=await cloudinary.uploader.upload(fileUri.content);
    console.log("user :",req.user);
    try{
      const newPost=await Post.create({
        title:title,
        content:content,
        photo:{
          public_id:mycloud.public_id,
          url:mycloud.secure_url
        },
        user:req.user._id,
      })
      const userData=req.user;
      // console.log(newPost);
      // console.log(newPost._id);
      userData.posts.push(newPost._id);
      await userData.save();
      // console.log(userData);
      
      res.status(201).json({
        success:true,
        message:"post created"
      })
    }catch(err){
      // console.log(err);
      console.log("error in getting");
      res.json({success:false,error:"can't get"})
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
      // console.log(err);
      res.json({success:false,message:"can't patch, not available"})
    }
  
  }



  export const deletePost=async(req,res)=>{
    const Id=parseInt(req.params.id);
    // console.log(Id);
    try{
       await Post.findOneAndDelete(
        {id:Id}
        );
        res.status(200).json({success:true,message:"successfully deleted"});
    }catch(err){
      // console.log(err);
      res.json({success:false,message:"can't delete, not available"})
    }
  }

  export const likePost = async (req, res) => {
    try {
      const user = req.user;
      const postId = req.params.id;
      // Find the post by its ID and add the user to the 'likes' array
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: user._id } },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error while adding a like.' });
    }
  }
  


  export const dislikePost= async(req, res) => {
    try {
      const user = req.user;
      const postId = req.params.id;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: user._id } },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error while adding a like.' });
    }
  }