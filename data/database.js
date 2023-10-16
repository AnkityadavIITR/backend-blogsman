import mongoose from "mongoose";
import { config } from "dotenv";

config({
    path:"../config.env"
  })

export const dbconnect= () =>{
    mongoose.connect
    (process.env.MONGO_URI,{dbName:"blogs"})
    .then((c)=>console.log(`Database connected with ${c.connection.host}`))
    .catch(err=>console.log(err))   
}
