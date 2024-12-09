// Importing necessary libraries and components
import React from "react"; // React library for creating components and managing UI
import PostComponent from "./PostComponent"; // A custom component for rendering individual posts
import { useInfiniteQuery } from "@tanstack/react-query"; // React Query hook for managing infinite scrolling data
import axios from "axios"; // A library for making HTTP requests
import InfiniteScroll from "react-infinite-scroll-component"; // Library for implementing infinite scrolling
import { useSearchParams } from "react-router-dom"; // A hook for handling query parameters in the URL

// API base URL is configured in environment variables
const API_URL = import.meta.env.VITE_API_URL;

function PostListComponent() {
  // State to handle search and sort parameters from the URL
  const [searchParam, setSearchParam] = useSearchParams(); 

  // Function to fetch posts from the server
  const fetchPosts = async (pageParam, searchParam) => {
    // Convert the search parameters into an object for easier manipulation
    const searchObj = Object.fromEntries([...searchParam]);

    // Make an HTTP GET request to the API endpoint
    const response = await axios.get(`${API_URL}/api/v1/posts/post-list`, {
      params: { 
        page: pageParam, // Current page to fetch
        limit: 5, // Number of posts per page
        ...searchObj, // Additional query parameters for search and sorting
      },
    });

    return response.data; // Return the response data (posts and metadata)
  };

  // React Query hook for infinite scrolling
  const {
    data, // Contains the fetched data (all pages of posts)
    error, // Holds error information if the request fails
    fetchNextPage, // Function to fetch the next page of posts
    hasNextPage, // Boolean to indicate if there are more pages to load
    isFetching, // Boolean to show if data is currently being fetched
    isFetchingNextPage, // Boolean for checking if the next page is being fetched
    status, // The current status of the query (e.g., 'loading', 'error', 'success')
  } = useInfiniteQuery({
    // A unique key to cache and identify this query
    queryKey: ["posts", searchParam.toString()],
    // The function to fetch data
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParam),
    // The initial page to start fetching from
    initialPageParam: 1,
    // Function to determine the next page to fetch
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // If data is still loading, display a loading message
  if (status === "loading") return "Loading...";

  // If an error occurred during the fetch, show an error message
  if (status === "error") return "An error has occurred: " + error.message;

  // Combine all fetched pages of posts into a single array
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  // Render the list of posts using infinite scrolling
  return (
    <InfiniteScroll
      dataLength={allPosts.length} // Total number of posts loaded so far
      next={fetchNextPage} // Function to fetch the next page of posts
      hasMore={!!hasNextPage} // Check if there are more posts to load
      loader={<h4>Loading more posts...</h4>} // Message displayed while fetching more posts
      endMessage={
        // Message displayed when all posts are loaded
        <p
          style={{ textAlign: "left", marginBottom: "20px", marginTop: "20px" }}
        >
          <b>You have reached the end of the post list</b>
        </p>
      }
    >
      {/* Loop through all posts and render each one using the PostComponent */}
      {allPosts.map((post) => (
        <PostComponent key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
}

export default PostListComponent;
