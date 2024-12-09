import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
const API_URL = import.meta.env.VITE_API_URL;

const FeaturedPosts = () => {
  //  am using this function to truncate my texts/optional
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const fetchPost = async () => {
    const res = await axios.get(
      `${API_URL}/api/v1/posts/post-list?featured=true&limit=4&sort=newest`
    );
    return res.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong" + error.message;
  if (!data) return "Post not found";

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  console.log(posts);

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* MOST POPULAR POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        {posts[0].img && (
          <Image
            path={posts[0].img}
            className="rounded-3xl object-cover"
            alt=""
            w="895"
          />
        )}
        {/* Details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link
            to={`/post/${posts[0].slug}`}
            className="text-blue-800 lg:text-lg"
          >
            {posts[0].title}
          </Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        {/* Title */}
        <Link
          to={`/post/${posts[0].slug}`}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {truncateText(posts[0].desc, 100)}
        </Link>
      </div>
      {/* OTHER POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            {posts[1].img && (
              <Image
                path={posts[1].img}
                className="rounded-3xl object-cover w-full h-full"
                w="298"
              />
            )}
          </div>

          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link to={`/post/${posts[1].slug}`} className="text-blue-800">
                {posts[1].title}
              </Link>
              <span className="text-gray-500 text-sm">
                {format(posts[1].createdAt)}
              </span>
            </div>
            {/* title */}
            <Link
              to={`/post/${posts[1].slug}`}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {truncateText(posts[1].desc, 100)}
            </Link>
          </div>
        </div>
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            {posts[2].img && (
              <Image
                path={posts[2].img}
                className="rounded-3xl object-cover w-full h-full"
                w="298"
              />
            )}
          </div>

          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">03.</h1>
              <Link to={`/post/${posts[2].slug}`} className="text-blue-800">
                {posts[2].title}
              </Link>
              <span className="text-gray-500 text-sm">
                {format(posts[2].createdAt)}
              </span>
            </div>
            {/* title */}
            <Link
              to={`/post/${posts[2].slug}`}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {truncateText(posts[2].desc, 100)}
            </Link>
          </div>
        </div>
        <div className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            {posts[3].img && (
              <Image
                path={posts[3].img}
                className="rounded-3xl object-cover w-full h-full"
                w="298"
              />
            )}
          </div>

          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">04.</h1>
              <Link to={`/post/${posts[3].slug}`} className="text-blue-800">
                {posts[3].title}
              </Link>
              <span className="text-gray-500 text-sm">
                {format(posts[3].createdAt)}
              </span>
            </div>
            {/* title */}
            <Link
              to={`/post/${posts[3].slug}`}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              {truncateText(posts[3].desc, 100)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
