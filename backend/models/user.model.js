import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // using clerkUserId because the user is created from the info from clerk
    clerkUserId:{
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)
export default User