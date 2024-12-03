import React from "react";
import Image from "./Image";

function Comment() {
  return (
    <div className="">
      <div className="p-4 bg-slate-50 rounded-xl mb-8">
        <div className="flex items-center gap-4">
          <Image
            path="/userImg.jpeg"
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
          <span className="font-medium">Adnan Issah</span>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>
        <div className="mt-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            aliquam nesciunt cupiditate, praesentium voluptate eaque
            necessitatibus, itaque ad maiores consequuntur repudiandae molestias
            voluptates at, tenetur eveniet laborum inventore nihil tempore?
          </p>
        </div>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl mb-8">
        <div className="flex items-center gap-4">
          <Image
            path="/userImg.jpeg"
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
          <span className="font-medium">Adnan Issah</span>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>
        <div className="mt-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            aliquam nesciunt cupiditate, praesentium voluptate eaque
            necessitatibus, itaque ad maiores consequuntur repudiandae molestias
            voluptates at, tenetur eveniet laborum inventore nihil tempore?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
