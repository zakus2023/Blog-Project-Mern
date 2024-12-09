// Import necessary hooks and libraries
import { useAuth, useUser } from "@clerk/clerk-react"; // For authentication and user management
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // For server state management
import axios from "axios"; // For making HTTP requests
import React from "react"; // React library
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// API base URL retrieved from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Functional component for Post menu actions
// `post` is passed as a prop from SinglePostPage.jsx
function PostMenuAction({ post }) {
  const navigate = useNavigate();
  // Extract user information using Clerk hooks
  const { user } = useUser();
  const { getToken } = useAuth(); // Function to retrieve the authentication token

  // Use React Query to fetch saved posts for the authenticated user
  const {
    isLoading: isPending, // Rename `isLoading` to `isPending` for consistency with the UI logic
    error, // Error state if the query fails
    data: savedPosts, // Data returned from the API
  } = useQuery({
    queryKey: ["savedPosts"], // Unique key to identify this query
    queryFn: async () => {
      const token = await getToken(); // Retrieve the token securely
      return await axios.get(`${API_URL}/api/v1/users/get-saved-posts`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
    },
  });

  // save/unsave and reset
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${API_URL}/api/v1/users/save-post`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  // check if the current user has an admin role
  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  // Determine if the current post is saved by the user
  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;

  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    saveMutation.mutate();
  };

  // ============================================================
  // delete post

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken(); // Await token retrieval
      return await axios.delete(
        `${API_URL}/api/v1/posts/delete-post/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // Adjust query key
      toast.success("Post deleted successfully");
      navigate("/posts"); // Navigate to posts page after successful deletion
    },
    onError: (error) => {
      const errorMessage = error.response?.data || "An error occurred"; // Safeguard error handling
      toast.error(errorMessage);
    },
  });

  const handleDelete = () => {
    if (!user) {
      return navigate("/login");
    }
    deleteMutation.mutate();
  };

  // ======================================================

  // Featured
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken(); // Await token retrieval
      return await axios.patch(
        `${API_URL}/api/v1/posts/feature`,
        { postId: post._id }, // Example request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] }); // Adjust query key
      toast.success("Post feature status updated successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred"; // Safeguard error handling
      toast.error(errorMessage);
    },
  });
  
  const handleFeatured = () => {
    if (!user) {
      return navigate("/login");
    }
    featureMutation.mutate();
  };
  

  // ==============================================

  return (
    <div className="mt-3">
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeatured}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={post.isFeatured ? "black" : "none"}
            />
          </svg>
          <span>Feature this post</span>

          <span className="text-xs"></span>
        </div>
      )}

      {/* Save post action */}
      <div
        className="flex gap-2 items-center py-2 text-sm cursor-pointer"
        onClick={user ? handleSave : () => navigate("/login")} // Redirect to login if unauthenticated
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20px"
          height="20px"
        >
          <path
            d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
            stroke="black"
            strokeWidth="2"
            fill={isSaved ? "black" : "none"} // Change fill based on `isSaved` status
          />
        </svg>
        <span>
          {user && isSaved
            ? "Unsave this post"
            : user && !isSaved
            ? "Save this post"
            : "Login to save"}
        </span>
        {saveMutation.isPending && (
          <span className="text-xs">(in progress)</span>
        )}
      </div>

      {/* Conditionally render delete action if the post belongs to the current user */}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          className="flex gap-2 items-center py-2 text-sm cursor-pointer"
          onClick={user ? () => handleDelete() : navigate("/login")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>

          <span>Delete this post</span>
          {deleteMutation.isPending && <span>Wait deletion in progress</span>}
        </div>
      )}
    </div>
  );
}

export default PostMenuAction;
