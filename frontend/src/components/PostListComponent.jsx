// Importing necessary libraries and components
import React from "react"; // React library for creating components and managing UI
import PostComponent from "./PostComponent"; // A custom component for rendering individual posts
import { useInfiniteQuery } from "@tanstack/react-query"; // A React Query hook for handling infinite scrolling data
import axios from "axios"; // A library for making HTTP requests
import InfiniteScroll from "react-infinite-scroll-component"; // A library to implement infinite scrolling functionality

// API URL from environment variables (configured during build time)
const API_URL = import.meta.env.VITE_API_URL;

function PostListComponent() {
  // A function to fetch posts from the server
  const fetchPosts = async (pageParam) => {
    // Make an HTTP GET request to fetch posts for the given page
    const response = await axios.get(`${API_URL}/api/v1/posts/post-list`, {
      params: { page: pageParam }, // Pass `pageParam` as a query parameter (e.g., ?page=1)
    });

    return response.data; // Return the response data containing posts and metadata
  };

  // Destructure values from the useInfiniteQuery hook
  const {
    data, // The data fetched from the server (contains all pages of results)
    error, // Contains error information if the query fails
    fetchNextPage, // A function to fetch the next page of data
    hasNextPage, // Boolean indicating if there are more pages to load
    isFetching, // Boolean indicating if a fetch request is currently in progress
    isFetchingNextPage, // Boolean indicating if the next page is currently being fetched
    status, // The current status of the query (e.g., 'loading', 'error', 'success')
  } = useInfiniteQuery({
    queryKey: ["posts"], // A unique key to identify this query
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam), // Fetch function with the default page parameter
    initialPageParam: 1, // The initial page to start fetching from
    getNextPageParam: (lastPage, pages) =>
      // Define how to determine the next page
      lastPage.hasMore ? pages.length + 1 : undefined, // If there are more posts, increment the page number
  });

  // Show a loading message while data is being fetched
  if (status === "loading") return "Loading...";

  // Show an error message if the query fails
  if (status === "error") return "An error has occurred: " + error.message;

  // Flatten all pages of posts into a single array
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  // Render the list of posts with infinite scrolling
  return (
    <InfiniteScroll
      dataLength={allPosts.length} // The current total number of posts loaded
      next={fetchNextPage} // Function to fetch the next page when the user scrolls
      hasMore={!!hasNextPage} // Whether there are more posts to fetch
      loader={<h4>Loading more posts...</h4>} // Loader displayed while fetching more posts
      endMessage={
        // Message displayed when all posts are loaded
        <p style={{ textAlign: "left", marginBottom: "20px", marginTop: "20px" }}>
          <b>You have reached the end of the post list</b>
        </p>
      }
    >
      {/* Render each post using the PostComponent */}
      {allPosts.map((post) => (
        <PostComponent key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
}

export default PostListComponent;
