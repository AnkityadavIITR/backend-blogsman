import User from "../models/user.js";
import { config } from "dotenv";
import { sendCookies } from "../utils/cookie.js";
import bcrypt from "bcrypt";
import { getDataUri } from "../utils/dataUri.js";
import {v2 as cloudinary} from "cloudinary"

config({
    path:"../config.env"
  })

export const addNewUser=async(req,res)=>{

    const {name,email,password}=req.body;
    const user=await User.findOne({email:email});
    console.log("user :",user);
    if(user?.email){
        return res.json({
            success:false,
            message:"already account exist"
        })
    }

    try{
        console.log(req.file);
        const file=req.file;
        const fileUri=getDataUri(file);

        //sending the file to cloud
        const mycloud=await cloudinary.uploader.upload(fileUri.content);

        //bcryprting the password
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            photo:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            }
        })
        console.log(process.env.JWT_SECRET);
        sendCookies(res,newUser,"successfully register",201);
    }catch(err){
        res.json({success:false,message:"error in register"})
    }
}

export const logUser=async(req,res)=>{
    console.log("processing req");
    const {email,password}=req.body;
    try{
        // console.log("trying login");
        //not everyone can access the password we add the select to false in user schema in password section,
        //so herewe use ".select" to contain the password without logging
        const user=await User.findOne({email:email}).select("+password");
        if(user){
            const isMatch =await bcrypt.compare(password,user.password);
            
            //inside of sending token in json to forntend,
            // we can directly set the cookie from backend in user system but required jwt
            if(isMatch){
                // console.log("match");
                const userWithPost= await User.findOne({_id:user._id});
                sendCookies(res,userWithPost,"succefully login",200);
            }else res.json({success:false,message:"incorrect password"});
        }else{
            res.json({token:null});
        }
    }catch(err){
        res.status(404);
    }
}

export const logout=async(req,res)=>{
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
      message:"logged out"
    });

}

export const getUserProfile=async(req,res)=>{
    const userWithPosts = await User.findOne({ _id: req.user._id }).populate('posts');
    res.status(200).json({
        success:true,
        user:userWithPosts
    })
}

export const getUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const response=await User.findById(id).populate('posts');
        res.status(200).json({
            success:true,
            user:response
        })
    }catch(e){
        res.status(404).json({
            success:false,
            message:"can't get user"
        })
    }
}