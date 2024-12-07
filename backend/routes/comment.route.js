import express from "express";
import {
  addComments,
  deleteComments,
  getComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/get-comments/:postId", getComments);
router.post("/add-comments/:postId", addComments);
router.delete("/delete-comments/:postId", deleteComments);

export default router;