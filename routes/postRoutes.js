import express from "express";
import bodyParser from "body-parser";
import { isAuthanticated } from "../middleware/auth.js";
import { addPost, deletePost, getAllPost, getPostById, patchPost,likePost,dislikePost } from "../controller/post.js";
import singleUpload from "../middleware/multer.js";

const router=express.Router();

//middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


//CHALLENGE 1: GET All posts
router.get("/allpost",isAuthanticated, getAllPost)

//CHALLENGE 2: GET a specific post by id
router.get("/:id",isAuthanticated,getPostById)
  
  
//CHALLENGE 3: POST a new post
router.post("/new",isAuthanticated ,singleUpload, addPost)

//like the post
router.post("/:id/like" , isAuthanticated, likePost)

//dislike the post
router.post("/:id/dislike" , isAuthanticated, dislikePost)
  
  
//CHALLENGE 4: PATCH a post when you just want to update one parameter
router.patch("/:id",isAuthanticated,patchPost)
  
//CHALLENGE 5: DELETE a specific post by providing the post id.
router.delete("/:id",isAuthanticated,deletePost)
  

export default router