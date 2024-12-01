import { IKImage } from "imagekitio-react";
import React from "react";

function Image({ path, className, alt }) {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={path}
      alt={alt}
      className={className}
    //   optional part
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
    />
  );
}

export default Image;
