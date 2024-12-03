import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

function PostComponent() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image path="/postImg.jpeg" className="rounded-2xl object-cover" />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          tempore maiores
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">Abdul-Razak</Link>
          <span>on</span>
          <Link className="text-blue-800">DevOps</Link>
          <span>2 days ago</span>
        </div>
        <p >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          alias, sunt labore iure eaque velit cupiditate veniam numquam fugiat
          non qui earum quis incidunt rem quos minima, dolore facilis. Fugiat!
        </p>
        <Link to="/test" className="text-blue-800 underline text-sm">Read more</Link>
      </div>
    </div>
  );
}

export default PostComponent;
