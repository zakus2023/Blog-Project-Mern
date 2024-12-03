import React from "react";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostListComponent from "../components/PostListComponent";

function HomePage() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        <span>
          <LuDot />
        </span>
        <span className="text-blue-600">Blog and Articles</span>
      </div>
      {/* ----------------- */}
      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* title */}
        <div>
          <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
            {" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h1>
          <p className="mt-8 text-md md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum et
            dolore amet.
          </p>
        </div>
        {/* animated button */}
        <Link to="/write" className=" hidden md:block relative">
          {/* added this to index.css file .animationButton{
                              animation-duration: 10000ms;}
                               */}
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            // className="text-lg tracking-widest animate-spin animationButton"
            className="text-lg tracking-widest"
          >
            <path
              id="circlePath"
              d="M 100, 100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              fill="none"
              stroke="none"
            />

            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write Your Story.
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea.
              </textPath>
            </text>
          </svg>
          <button className="absolute bg-blue-800 rounded-full flex items-center justify-center top-0 left-0 right-0 bottom-0 m-auto h-20 w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              stroke-width="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />

              <polyline points="14 6 18 6 18 10" />
            </svg>
          </button>
        </Link>
      </div>
      {/* CATEGORIES COMPONENT */}
      <MainCategories/>
      {/* FEATURED POSTS */}
      <FeaturedPosts/>
      {/* Recenet Posts */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recenet Posts</h1>
        <PostListComponent/>
      </div>
    </div>
  );
}

export default HomePage;
