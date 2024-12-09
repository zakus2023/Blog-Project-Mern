import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { format } from "timeago.js";



// {post} the post is from the PostListComponent.jsx it was passed as props and was accepted here
function PostComponent({ post }) {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image path={post.img} className="rounded-2xl object-cover" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={`/posts?author=${post.user.username}`} className="text-blue-800">{post.user.username}</Link>
          <span>on</span>
          <Link className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link
          to={`/post/${post.slug}`}
          className="text-blue-800 underline text-sm"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export default PostComponent;
