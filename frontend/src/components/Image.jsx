import { IKImage } from "imagekitio-react";
import React from "react";

function Image({ path, className, alt, w, h }) {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={path}
      alt={alt}
      className={`object-cover ${className}`} // Ensure proper scaling
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
}

export default Image;
