//learning the user authentication
//integrated database by learning mongoose
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbconnect } from "./data/database.js";
import userRouter from "./routes/userRoutes.js"
import postRouter from "./routes/postRoutes.js"
import cors from "cors"

//module need to setup env file
import { config } from "dotenv";
config({
  path:"./config.env"
})

export const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONT_END_URI,
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))


//using the userRouter here from userRoutes
app.use("/user",userRouter);
//using the postRouter form postRoutes in routes
app.use("/posts", postRouter);
