import express from 'express'
import { getSavedPosts, savePost } from '../controllers/user.controller.js'

const router = express.Router()

// get the user info
router.get("/get-saved-posts", getSavedPosts)

// update the user info with the posts the user has saved
router.patch("/save-post", savePost)

export default router