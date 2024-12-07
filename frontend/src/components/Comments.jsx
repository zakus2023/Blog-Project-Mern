// Import necessary modules and components
import React from "react";
import Comment from "./Comment"; // Component for displaying individual comments
import axios from "axios"; // Axios for HTTP requests
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // React Query for data fetching and mutations
import { useAuth, useUser } from "@clerk/clerk-react"; // Clerk hooks for user authentication
import { toast } from "react-toastify"; // Toast notifications for user feedback

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Function to fetch comments for a specific post by its ID
const fetchComments = async (postId) => {
  if (!postId) throw new Error("Post ID is required"); // Ensure postId is provided
  const res = await axios.get(`${API_URL}/api/v1/comments/get-comments/${postId}`); // Fetch comments
  return res.data; // Return the fetched data
};

function Comments({ postId }) {
  // Hooks from Clerk for user authentication and data
  const { isSignedIn, user } = useUser(); // Access the current user
  const { getToken } = useAuth(); // Function to get an auth token

  // React Query client to manage and refresh data queries
  const queryClient = useQueryClient();

  // Fetch comments using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId], // Unique key for the query
    queryFn: () => fetchComments(postId), // Function to fetch comments
    enabled: !!postId, // Only run the query if postId is defined
  });

  // React Query mutation for adding a new comment
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken(); // Retrieve auth token
      return axios.post(
        `${API_URL}/api/v1/comments/add-comments/${postId}`, // Endpoint for adding comments
        newComment, // New comment data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach auth token
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]); // Refresh comments after successful mutation
      toast.success("Comment added successfully!"); // Display success message
    },
    onError: (error) => {
      toast.error(
        `Error creating comment: ${error.response?.data?.message || error.message}` // Show error message
      );
    },
  });

  // Form submission handler
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target); // Capture form data
    const comment = formData.get("desc"); // Extract comment text
    if (!comment) {
      toast.error("Comment cannot be empty"); // Display error for empty comments
      return;
    }
    mutation.mutate({ desc: comment }); // Trigger mutation with the new comment
    e.target.reset(); // Clear the form after submission
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      {/* Heading for comments section */}
      <h1 className="text-xl text-gray-500 underline">Comments</h1>

      {/* Form for adding a new comment */}
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc" // Field name for the comment text
          placeholder="Write a comment" // Placeholder text
          className="w-full p-4 rounded-xl"
        />
        <button
          type="submit" // Submit button
          className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl"
        >
          Send
        </button>
      </form>

      {/* Display comments or fallback states */}
      {isLoading ? (
        "Loading..." // Show loading state
      ) : error ? (
        `Error loading comments: ${error.message}` // Show error state
      ) : (
        <>
          {/* Show temporary comment while mutation is pending */}
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables?.desc || ""} (Sending...)`, // Show text being sent
                createdAt: new Date(), // Temporary timestamp
                user: {
                  img: user?.imageUrl, // User's avatar
                  username: user?.username, // User's name
                },
              }}
            />
          )}

          {/* Map through and display existing comments */}
          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
