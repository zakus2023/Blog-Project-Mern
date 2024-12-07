import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

// Get all posts
export const getPosts = async (req, res) => {
  try {
    // Parse the `page` query parameter from the request. Convert it to an integer.
    // If `page` is not provided or is invalid, default to 1.
    const page = parseInt(req.query.page) || 1;

    // Parse the `limit` query parameter from the request. Convert it to an integer.
    // If `limit` is not provided or is invalid, default to 5 posts per page.
    const limit = parseInt(req.query.limit) || 5;

    // Fetch posts from the database using Mongoose.
    const posts = await Post.find()
      .populate("user", "username")
      .lean() // Use `lean()` to return plain JavaScript objects instead of Mongoose documents.
      // This improves performance for read operations, as it skips adding Mongoose's methods and features.
      .limit(limit) // Limit the number of results to the specified `limit`.
      // This is used to control how many posts are retrieved per page.
      .skip((page - 1) * limit); // Skip a certain number of results to fetch the correct page.
    // Formula: (page - 1) * limit
    // For example:
    // - On page 1: skip 0 results (fetch the first set).
    // - On page 2: skip the first `limit` results.
    // - On page 3: skip the first `2 * limit` results, and so on.

    // Get the total number of posts in the database for pagination.
    const totalPosts = await Post.countDocuments(); // Use `countDocuments()` to get the count of all posts.

    // Check if there are more posts available after the current page.
    const hasMore = page * limit < totalPosts;
    // `hasMore` is true if the current page has not reached the total number of posts.

    // Send the retrieved posts and pagination information as a JSON response.
    res.status(200).json({ posts, hasMore });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message.
    res
      .status(500)
      .json({ message: "Failed to fetch posts", error: error.message });
  }
};

// Get a particular post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .lean()
      .populate("user");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch post", error: error.message });
  }
};

// Create a post
export const createPost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create the slug
    let slug = req.body.title.replace(/ /g, "_").toLowerCase();
    // check if a post with this slug exist(that is if the slug is already associated with any post)
    let existingPost = await Post.findOne({ slug });
    // create a variable called counter
    let counter = 2;
    // if the slug created above is already assigned
    while (existingPost) {
      // add the number 2 (the value of counter) and assign the new result to slug
      slug = `${slug}-${counter}`;
      //   check again if existingPost exist
      existingPost = await Post.findOne({ slug });
      //   increase the counter by 1
      counter++;
    }
    // create the post with the req.body coming from frontend, user that we obtained here and the the slug created here
    const newPost = new Post({ user: user._id, slug, ...req.body });
    // save the post
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
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!deletedPost) {
      return res
        .status(403)
        .json({ message: "You can delete only your posts" });
    }

    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};

// upload a image and video using imagekit

const imageKit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imageKit.getAuthenticationParameters();
  res.send(result);
};
