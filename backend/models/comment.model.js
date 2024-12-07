import mongoose from "mongoose";

const { Schema } = mongoose; // Destructure Schema from mongoose

const commentSchema = new Schema(
  {
    // Add the user who made the comment to the comment model
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Add the post for which the comment was made to the comment model
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    // Description of the comment
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
