import React from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router-dom";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import { Helmet } from "react-helmet-async";
import "react-quill-new/dist/quill.snow.css";

const API_URL = import.meta.env.VITE_API_URL;

const fetchPost = async (slug) => {
  const res = await axios.get(`${API_URL}/api/v1/posts/post/${slug}`);
  return res.data;
};

function SinglePostPage() {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading";
  if (error) return "Something went wrong" + error.message;
  if (!data) return "Post not found";

  return (
    <div className="flex flex-col gap-8">
      {/* SEO Metadata */}
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.desc} />
        <meta name="author" content={data.user.username} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.desc} />
        {data.img && <meta property="og:image" content={data.img} />}
      </Helmet>

      {/* Detail */}
      <div className="flex gap-8 flex-1">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span className="">on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>

        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image path={data.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Text */}
        <div
          className="lg:text-lg flex flex-col gap-6 text-justify custom-content flex-1"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* Menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  path={data.user.img}
                  className="rounded-full object-cover w-12 h-12"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <div className="flex gap-2">
              <Link>
                <Image path="/facebook.svg" />
              </Link>
              <Link>
                <Image path="/instagram.svg" />
              </Link>
            </div>
          </div>

          {/* Actions */}
          <PostMenuAction post={data} />
          {/* Categories */}
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All Categories</Link>
            <Link className="underline">Databases</Link>
            <Link className="underline">AWS</Link>
            <Link className="underline">DevOps</Link>
            <Link className="underline">Software engineering</Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
}

export default SinglePostPage;
