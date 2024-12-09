import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// fetch all commmets that belong to a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user")
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

//   add comment
// Controller to handle adding comments to a post
export const addComments = async (req, res) => {
  // Extract Clerk user ID from the authentication middleware
  const clerkUserId = req.auth?.userId; // Safely access userId
  const postId = req.params?.postId; // Extract post ID from the request parameters

  // Check if the user is authenticated
  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!"); // Respond with 401 if not authenticated
  }

  try {
    // Find the user in the database by their Clerk user ID
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json("User not found!"); // Respond with 404 if user doesn't exist
    }

    // Create a new comment object with the request body, user ID, and post ID
    const newComment = new Comment({
      ...req.body, // Spread the comment details (e.g., description) from the request body
      user: user._id, // Associate the comment with the user's ID
      post: postId, // Associate the comment with the post ID
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment); // Respond with the created comment and 201 status
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding comment:", error.message);
    res.status(500).json("Server error while adding comment."); // Respond with a generic server error message
  }
};

//   delete comment
export const deleteComments = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;
  console.log(id)

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json("Comment not found.");
    }
    return res.status(200).json("Comment has been deleted");
  }

  // Find the user
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(403).json("User not found or unauthorized.");
  }

  // Check if the comment belongs to the user
  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment!");
  }

  res.status(200).json("Comment deleted");
};
