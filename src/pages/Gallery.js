import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { getFirestore, collection, getDocs } from "firebase/firestore"
import Booth from "./Booth";

const queryData = async (app) => {
    if(!app) return [];
    const db = getFirestore(app); 
    const querySnapshot = await getDocs(collection(db, "images"))
    const data = []
    querySnapshot.forEach((doc) => {
        const pushData = doc.data()
        data.push(pushData)
    });
    return data;
}

function Gallery({ caption, app, capturedImage }) {
  // const [images, setImages] = useState([]);
  // const navigate = useNavigate()
  // const [uploadData, setUploadData] = useState([])

  // useEffect(() => {
  //   fetch("/get-images")
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.success) {
  //         setImages(data.images);
  //       } else {
  //         console.log(data.error);
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  // useEffect(() => {
  //   if(!app) return;
  //   queryData(app).then(setUploadData)
  // }, [app])

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="galleryPage">
            <h2>Self Portraits Throughout History</h2>
            <div>
              {capturedImage && <img src={capturedImage}></img>}
            </div>
          {/* {images.map(image => (
            <img key={image} src={image} alt="selfie" />
          ))} */}
        <div className="galleryWrapper">
            <div className="galleryItem">
                {/* {uploadData.map((upload) => (
                    <img src={upload}></img>,
                    <p>{caption}</p>
                ))} */}
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;