import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { isAuthanticated } from "../middleware/auth.js";
import { addNewUser, getUserProfile, logUser } from "../controller/user.js";
import singleUpload from "../middleware/multer.js";

config({
    path:"../config.env"
  })

const router=express.Router();

//middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());


//register route
router.post("/register", singleUpload , addNewUser);
//login route
router.post("/login",logUser);

//user profile
router.get("/me", isAuthanticated , getUserProfile);

export default router;