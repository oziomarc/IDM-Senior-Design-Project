import React, { useEffect, useState } from "react";
import Header from "../components/Header";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/get-images")
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setImages(data.images);
        } else {
          console.log(data.error);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="galleryPage">
            <h2>Self Portraits Throughout History</h2>
          {/* {images.map(image => (
            <img key={image} src={image} alt="selfie" />
          ))} */}
        <div className="galleryWrapper">
            <div className="galleryItem">
                <img></img>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;