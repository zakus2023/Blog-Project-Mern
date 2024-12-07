import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  uploadAuth,
} from "../controllers/post.controller.js";

const router = express.Router();

//upload-image to imagekit.io
router.get("/upload-auth", uploadAuth)
// get a list of posts
router.get("/post-list", getPosts);
// get a single post
router.get("/post/:slug", getPost);
// create post
router.post("/create-post", createPost);
// delete post
router.delete("/delete-post/:id", deletePost);




export default router;
