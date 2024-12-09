import React from "react";
import Image from "./Image";
import { format } from "timeago.js";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

function Comment({ comment, postId }) {
  const { user } = useUser();
  const { getToken } = useAuth();
  console.log(comment._id)

  // Check if the current user has an admin role
  const isAdmin = user?.publicMetadata?.role === "admin";

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken(); // Retrieve token
      return await axios.delete(
        `${API_URL}/api/v1/comments/delete-comment/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] }); // Invalidate queries for this post
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  const handleDelete = () => {
    if (!user) {
      toast.error("You must be logged in to delete comments.");
      return;
    }
    deleteMutation.mutate();
  };

  return (
    <div>
      <div className="p-4 bg-slate-50 rounded-xl mb-8">
        <div className="flex items-center gap-4">
          {comment.user?.img && (
            <Image
              path={comment.user.img}
              className="w-10 h-10 rounded-full object-cover"
              w="40"
            />
          )}
          <span className="font-medium">{comment.user?.username || "Unknown User"}</span>
          <span className="text-sm text-gray-500">
            {format(comment.createdAt)}
          </span>
          {user && (comment.user?.username === user.username || isAdmin) && (
            <span onClick={handleDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="red"
                width="15px"
                height="15px"
                className="cursor-pointer"
              >
                <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
              </svg>
            </span>
          )}
        </div>
        <div className="mt-2">
          <p>{comment.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
