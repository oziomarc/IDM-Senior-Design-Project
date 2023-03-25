import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { getFirestore, collection, getDocs } from "firebase/firestore"
import Booth from "./Booth";
import filler1 from "../files/filler00001.png"
import filler2 from "../files/filler00002.png"
import filler3 from "../files/filler00003.png"
import filler4 from "../files/filler00004.png"
import filler5 from "../files/filler00005.png"
import filler6 from "../files/filler00006.png"
import filler7 from "../files/filler00007.png"
import filler8 from "../files/filler00008.png"
import filler9 from "../files/filler00009.png"
import filler10 from "../files/filler00010.png"

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
              <img src={filler1} alt="filler-1" id="1433"></img>
            </div>
            <div className="galleryItem">
              <img src={filler7} alt="filler-7" id="1839"></img>
            </div>
            <div className="galleryItem">
              <img src={filler8} alt="filler-8" id="1900"></img>
            </div>
            <div className="galleryItem">
              <img src={filler4} alt="filler-4" id="1914"></img>
            </div>
            <div className="galleryItem">
              <img src={filler5} alt="filler-5" id="1966"></img>
            </div>
            <div className="galleryItem">
              <img src={filler9} alt="filler-9" id="1966"></img>
            </div>
            <div className="galleryItem">
              <img src={filler6} alt="filler-6" id="1920"></img>
            </div>
            <div className="galleryItem">
              <img src={filler3} alt="filler-3" id="2011"></img>
            </div>
            <div className="galleryItem">
              <img src={filler10} alt="filler-10" id="2014"></img>
            </div>
            <div className="galleryItem">
              <img src={filler2} alt="filler-2" id="2016"></img>
            </div>
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