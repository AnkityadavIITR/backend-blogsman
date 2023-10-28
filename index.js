//learning the user authentication
//integrated database by learning mongoose
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js"
import postRouter from "./routes/postRoutes.js"
import cors from "cors"

import cookieSession from "cookie-session";

import  "./utils/passport.js"

//module need to setup env file
import { config } from "dotenv";
import passport from "passport";
config({
  path:"./config.env"
})

export const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
    
	})
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//passport

app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
  origin:process.env.FRONT_END_URI,
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))


//using the userRouter here from userRoutes
app.use("/user",userRouter);
//using the postRouter form postRoutes in routes
app.use("/posts", postRouter);

// app.use("/auth",authRouter);
