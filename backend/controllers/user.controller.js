// Import the User model to interact with the database
import User from "../models/user.model.js";

/**
 * Controller to get the saved posts for a user.
 * This function retrieves the posts that the user has saved to their account.
 */
export const getSavedPosts = async (req, res) => {
  // Get the authenticated user's Clerk ID from the request object
  const clerkUserId = req.auth.userId;

  // Check if the user is authenticated
  if (!clerkUserId) {
    return res.status(401).json("You are not authenticated"); // Return a 401 status if the user is not authenticated
  }

  // Find the user in the database using their Clerk ID
  const user = await User.findOne({ clerkUserId });

  // Send the user's saved posts as a response
  res.status(200).json(user.savedPosts);
};

/**
 * Controller to save or unsave a post for a user.
 * If the post is already saved, it removes the post. Otherwise, it saves the post.
 */
export const savePost = async (req, res) => {
  // Extract the post ID from the request body
  const postId = req.body.postId;

  // Get the authenticated user's Clerk ID from the request object
  const clerkUserId = req.auth.userId;

  // Check if the user is authenticated
  if (!clerkUserId) {
    return res.status(401).json("You are not authenticated"); // Return a 401 status if the user is not authenticated
  }

  // Find the user in the database using their Clerk ID
  const user = await User.findOne({ clerkUserId });

  // Check if the post is already saved in the user's saved posts list
  const isSaved = user.savedPosts.some((p) => p === postId);

  // If the post is not saved, add it to the user's saved posts list
  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId }, // Add the post ID to the `savedPosts` array
    });
  } else {
    // If the post is already saved, remove it from the user's saved posts list
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId }, // Remove the post ID from the `savedPosts` array
    });
  }

  // Send a success response with an appropriate message
  res.status(200).json(isSaved ? "Post removed" : "Post saved for you");
};
