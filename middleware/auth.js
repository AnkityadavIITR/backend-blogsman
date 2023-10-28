import User from "../models/user.js";
import jwt from "jsonwebtoken"

import { config } from "dotenv";
config({
  path:"./config.env"
})

export const isAuthanticated=async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token);

    if(!token){
        return res.json({
            success:"false",
            message:"login first"
        })
    }
    // console.log(process.env.JWT_SECRET);
    const decodetoken=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodetoken._id);
    next();
}