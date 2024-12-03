import React from "react";
import { useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

function Write() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div className="">You must login</div>;
  }
  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form className="flex flex-col gap-6 flex-1 mb-3">
        <button className=" w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
          Add a cover image
        </button>
        <input
          type="text"
          placeholder="My Awsome story"
          className="text-4xl font-semibold bg-transparent outline-none"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm">Choose a category:</label>
          <select
            name="cat"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="Devops">DevOps</option>
            <option value="aws">AWS</option>
            <option value="databases">Database</option>
          </select>
        </div>
        <textarea
          name="desc"
          id=""
          placeholder="A short Description"
          className="p-4 rounded bg-white shadow-md"
        />
        {/* ========================================================== */}
        {/* also updated the index.css file for the q-editor */}
        <ReactQuill theme="snow" className="flex-1 rounded-md bg-white shadow-md"/>
        {/* =========================================================== */}
        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36">Post</button>
      </form>
    </div>
  );
}

export default Write;
