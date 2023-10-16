import express from "express";
import bodyParser from "body-parser";
import { isAuthanticated } from "../middleware/auth.js";
import { addPost, deletePost, getAllPost, getPostById, getUserpost, patchPost } from "../controller/post.js";

const router=express.Router();

//middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


//CHALLENGE 1: GET All posts
router.get("/",isAuthanticated, getAllPost)

//CHALLENGE 2: GET a specific post by id
router.get("/:id",isAuthanticated,getPostById)
  
  
//CHALLENGE 3: POST a new post
router.post("/new",isAuthanticated , addPost)
  
  
//CHALLENGE 4: PATCH a post when you just want to update one parameter
router.patch("/:id",isAuthanticated,patchPost)
  
//CHALLENGE 5: DELETE a specific post by providing the post id.
router.delete("/:id",isAuthanticated,deletePost)
  

export default router