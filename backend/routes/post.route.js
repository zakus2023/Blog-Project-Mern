import express from "express";
import {
  createPost,
  deletePost,
  featurePost,
  getPost,
  getPosts,
  uploadAuth,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";

const router = express.Router();

//upload-image to imagekit.io
router.get("/upload-auth", uploadAuth)
// get a list of posts
router.get("/post-list", getPosts);
// get a single post
router.get("/post/:slug", increaseVisit, getPost);
// create post
router.post("/create-post", createPost);
// delete post
router.delete("/delete-post/:id", deletePost);
// featured post
router.patch('/feature', featurePost)




export default router;
