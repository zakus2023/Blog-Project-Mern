import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { MdOndemandVideo, MdOutlineMonochromePhotos } from "react-icons/md";
import UploadFile from "../components/UploadFile";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Write() {
  const [value, setValue] = useState(""); //this is used to store the state of the value from the React-Quill editor
  // =======================================================================
  // for imageKit
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  // update the value: that is the content of the editor anytime you add image or video
  useEffect(()=>{
    img && setValue(prev=>prev+`<p><image src="${img.url}" /></p>`)
  },[img])

  useEffect(()=>{
    video && setValue(prev=>prev+`<p><iframe class="q-video" src="${video.url}" /></p>`)
  },[video])

  // ========================================================================================

  const navigate = useNavigate();
  
  const { getToken } = useAuth(); // create a token for the user when he is logged in

  const { isLoaded, isSignedIn } = useUser(); // this will be used to chek if the user is logged ibefore showing the component n or the user infor is loading

  // this function will be used to fetch the create post api from the backend using mutation and axios
  const mutation = useMutation({
    // the newPost is a parameter. when the function is called in the handleSubmit, we pass the data as the argument(to rplace the newPost)
    mutationFn: async (newPost) => {
      // create the token for the logged in user using getToken from useAuth
      const token = await getToken();
      // newPost which reprents the data we are getting from the handleSubmit funtion is sent to the backend when the create-post api is aclled
      return axios.post(`${API_URL}/api/v1/posts/create-post`, newPost, {
        headers: {
          // add the token to the headers to be sent to the create-post api. Because only requests with the token can create the post
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created successfully");
      // Optionally, navigate to another page or reset the form
      navigate(`/post/${res.data.post.slug}`);
    },
    onError: (error) => {
      alert(`Error creating post: ${error.message}`);
    },
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (isLoaded && !isSignedIn) {
    navigate("/login");
  } // redirect the user to the login page if user is not logged in

  // use this function to get the data from the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      // add the cover image to the data
      img: cover.filePath || "",
      // ==========================
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    if (!data.title || !data.desc || !data.content) {
      alert("Please fill in all required fields.");
      return;
    }

    // pass the data at argument to the mutation function which is above
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form className="flex flex-col gap-6 flex-1 mb-3" onSubmit={handleSubmit}>
        <UploadFile type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            Add a cover image
          </button>
        </UploadFile>

        <input
          type="text"
          placeholder="My Awesome Story"
          className="text-4xl font-semibold bg-transparent outline-none"
          name="title"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm">Choose a category:</label>
          <select name="category" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="devops">DevOps</option>
            <option value="aws">AWS</option>
            <option value="databases">Database</option>
          </select>
        </div>
        <textarea
          name="desc"
          placeholder="A short Description"
          className="p-4 rounded bg-white shadow-md"
        />
        <div className="flex flex-1">
          {/* add an image and video upload */}
          <div className="flex flex-col gap-2 mr-2">
            {/* image upload */}
            <UploadFile type="image" setProgress={setProgress} setData={setImg}>
              <div className="">
                <MdOutlineMonochromePhotos />
              </div>
            </UploadFile>

            {/* video upload */}
            <UploadFile
              type="video"
              setProgress={setProgress}
              setData={setVideo}
            >
              <div className="">
                <MdOndemandVideo />
              </div>
            </UploadFile>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-md bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>

        {0 < progress && progress <= 100 ? (
          <div className="text-green-600 font-bold">
            <span>File upload: {progress}% completed</span>
          </div>
        ) : (
          ""
        )}

        <button
          type="submit"
          className={`bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 ${
            mutation.isLoading ? "opacity-50" : ""
          }`}
          disabled={mutation.isLoading || (0 < progress && progress < 100)}
        >
          {mutation.isLoading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}

export default Write;
