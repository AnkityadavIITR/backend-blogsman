import { app } from "./index.js";
import { dbconnect } from "./data/database.js";
import { config } from "dotenv";
import {v2 as cloudinary} from "cloudinary"


config({
  path:"./config.env"
})

dbconnect();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_SECRET,
})


app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});