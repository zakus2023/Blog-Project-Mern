import React from "react";
import Image from "../components/Image";
import { Link } from "react-router-dom";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/Comments";

function SinglePostPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            aperiam
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">Abdul-Razak</Link>
            <span className="">on</span>
            <Link className="text-blue-800">DevOps</Link>
            <span>2 days ago</span>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Laudantium, magni sint recusandae, illo corporis neque soluta
            debitis quaerat possimus, blanditiis vitae facere fugit vero nemo?
            Ipsa voluptate unde voluptatum recusandae.
          </p>
        </div>

        <div className="hidden lg:block w-2/5">
          <Image path="/postImg.jpeg" w="600" className="rounded-2xl" />
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            fugiat velit inventore amet rem iste commodi distinctio nihil
            aliquid sint quae odit ducimus unde accusamus nemo pariatur,
            praesentium quidem excepturi. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Porro fugiat velit inventore amet rem iste commodi
            distinctio nihil aliquid sint quae odit ducimus unde accusamus nemo
            pariatur, praesentium quidem excepturi.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <Image
                path="/userImg.jpeg"
                className="rounded-full object-cover w-12 h-12"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">Abdul-Razak</Link>
            </div>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
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
          <PostMenuAction />
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
      <Comments/>
      
    </div>
  );
}

export default SinglePostPage;
