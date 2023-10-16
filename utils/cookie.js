import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({
  path:"../config.env"
})

export const sendCookies=(res,user,message,status)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(status)
    .cookie("token",token,{
        httpOnly:true,
        maxAge:60*60*1000,
        sameSite: process.env.NODE_ENV==="Development"? "lax" : 'none',
        secure:process.env.NODE_ENV==="Development"? false: true,
    })
    .json({
      success:"true",
      message,
      user
    }
    );
}