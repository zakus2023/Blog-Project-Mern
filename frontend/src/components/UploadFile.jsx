import { IKContext, IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

// =================================================================================
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

// configure imageKit here
const authenticator = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/posts/upload-auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

// ==========================================================================

function UploadFile({ children, type, setProgress, setData }) {
  const ref = useRef(null);
  // for imageKit
  const onSuccess = (res) => {
    setData(res);
    toast.success("Image uploaded successfully");
    console.log(res.url);
  };

  const onError = (error) => {
    console.log(error);
    toast.error("Image upload failed");
  };

  const onUploadProgress = (progress) => {
    setProgress(Math.round(progress.loaded / progress.total) * 100);
    console.log(progress);
  };

  return (
    <div className="flex flex-col gap-2">
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {/* ...child components */}
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className="hidden"
          ref={ref}
          accept={`${type}/*`}
        />
        <div className="cursor-pointer" onClick={()=>ref.current.click()}>
            {children}
        </div>
      </IKContext>
    
    </div>
  );
}

export default UploadFile;
