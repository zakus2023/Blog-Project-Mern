// Import necessary modules and dependencies
import ImageKit from "imagekit"; // Used to interact with the ImageKit API for media uploads
import Post from "../models/post.model.js"; // Mongoose model for handling posts in the database
import User from "../models/user.model.js"; // Mongoose model for handling users in the database
import dotenv from "dotenv"; // Loads environment variables from a .env file into process.env

// Load environment variables
dotenv.config();

// Initialize ImageKit with credentials from environment variables
const imageKit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT, // Base URL for ImageKit media assets
  publicKey: process.env.IK_PUBLIC_KEY,    // Public API key for ImageKit
  privateKey: process.env.IK_PRIVATE_KEY,  // Private API key for secure ImageKit interactions
});

// Controller to fetch all posts with optional filters and sorting
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 5; // Number of posts per page (default: 5)

    const query = {}; // Query object to filter posts
    const { cat, author, search, sort, featured } = req.query; // Extract query parameters from request

    const sortQuery = sort || "newest"; // Fallback to "newest" if no sort option is provided

    // Apply filters based on query parameters
    if (cat) query.category = cat; // Filter by category
    if (search) query.title = { $regex: search, $options: "i" }; // Search posts by title (case-insensitive)

    if (author) {
      // Find the user ID by the provided author username
      const user = await User.findOne({ username: author }).select("_id");
      if (!user) return res.status(404).json("No post found"); // Handle no user found
      query.user = user._id; // Filter posts by user ID
    }

    if (featured === "true") query.isFeatured = true; // Filter featured posts

    // Determine sort order based on the sort query parameter
    let sortObject = { createdAt: -1 }; // Default: newest posts first
    switch (sortQuery) {
      case "newest":
        sortObject = { createdAt: -1 }; // Sort by most recent
        break;
      case "oldest":
        sortObject = { createdAt: 1 }; // Sort by oldest
        break;
      case "popular":
        sortObject = { visit: -1 }; // Sort by most visited
        break;
      case "trending":
        sortObject = { visit: -1 }; // Sort by most visited in the last 7 days
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Posts from the last 7 days
        };
        break;
      default:
        break;
    }

    // Fetch posts based on filters, sort order, and pagination
    const posts = await Post.find(query)
      .sort(sortObject) // Apply sorting
      .populate("user", "username") // Populate user field with username
      .lean() // Return plain JavaScript objects
      .limit(limit) // Limit the number of posts
      .skip((page - 1) * limit); // Skip posts for pagination

    const totalPosts = await Post.countDocuments(query); // Count total posts matching the query
    const hasMore = page * limit < totalPosts; // Check if there are more posts

    res.status(200).json({ posts, hasMore }); // Send response with posts and pagination info
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
};

// Controller to fetch a single post by its slug
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("user", "username") // Populate user field with username
      .lean(); // Return plain JavaScript object

    if (!post) return res.status(404).json({ message: "Post not found" }); // Handle post not found

    res.status(200).json(post); // Send the found post
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post", error: error.message });
  }
};

// Controller to create a new post
export const createPost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId; // Extract authenticated user ID from request
    if (!clerkUserId) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findOne({ clerkUserId }); // Find the user by their authenticated ID
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a unique slug for the post based on its title
    let slug = req.body.title.replace(/ /g, "_").toLowerCase();
    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${slug}-${counter}`; // Append a counter to the slug if it already exists
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    // Create a new post instance and save it to the database
    const newPost = new Post({ user: user._id, slug, ...req.body });
    const post = await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: {
        id: post._id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        user: post.user,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error: error.message });
  }
};

// Controller to delete a post
export const deletePost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId; // Extract authenticated user ID from request
    if (!clerkUserId) return res.status(401).json({ message: "Not authenticated" });

    const role = req.auth?.sessionClaims?.metadata?.role || "user"; // Determine user role
    if (role === "admin") {
      await Post.findByIdAndDelete(req.params.id); // Allow admins to delete any post
      return res.status(200).json({ message: "Post has been deleted" });
    }

    const user = await User.findOne({ clerkUserId }); // Find the user by their authenticated ID
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only allow deletion of posts created by the user
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost) {
      return res.status(403).json({ message: "You can delete only your posts" });
    }

    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
};

// Controller to toggle the "featured" status of a post
export const featurePost = async (req, res) => {
  try {
    const postId = req.body.postId; // Extract post ID from request parameters
    const clerkUserId = req.auth?.userId; // Extract authenticated user ID
    

    if (!clerkUserId) return res.status(401).json({ message: "Not authenticated" });

    const role = req.auth?.sessionClaims?.metadata?.role || "user"; // Determine user role
    if (role !== "admin") return res.status(403).json({ message: "Unauthorized" });

    const post = await Post.findById(postId); // Find the post by ID
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Toggle the "isFeatured" property of the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { isFeatured: !post.isFeatured },
      { new: true } // Return the updated post
    );

    res.status(200).json(updatedPost); // Send the updated post
  } catch (error) {
    res.status(500).json({ message: "Failed to feature post", error: error.message });
  }
};

// Controller to generate ImageKit authentication parameters
export const uploadAuth = async (req, res) => {
  try {
    const result = imageKit.getAuthenticationParameters(); // Generate authentication parameters
    res.status(200).json(result); // Send the authentication parameters
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate auth parameters",
      error: error.message,
    });
  }
};
