import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Booth from "./Booth";
import appending from "./Booth";
import picture from "./Booth";
import GalleryPost from "../components/GalleryPost";
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

// const queryData = async (app) => {
//     if(!app) return [];
//     const db = getFirestore(app); 
//     const querySnapshot = await getDocs(collection(db, "images"))
//     const data = []
//     querySnapshot.forEach((doc) => {
//         const pushData = doc.data()
//         data.push(pushData)
//     });
//     return data;
// }

const firebaseConfig = {
  apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
  authDomain: "photobooth-7ee4c.firebaseapp.com",
  projectId: "photobooth-7ee4c",
  storageBucket: "photobooth-7ee4c.appspot.com",
  messagingSenderId: "343204330461",
  appId: "1:343204330461:web:398d0e337c44bec2cf9434"
};


function Gallery({ caption, app, capturedImage, appending, img, imageSrc }) {

  const [appInitialized, setAppInitialized] = useState();

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        setAppInitialized(true)
      },[]) 
  const [imgData, setImgData] = useState([])
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const storage = getStorage();
    const galleryRef = collection(db, 'images');

    onSnapshot(galleryRef, async (snapshot) => {
      const galleryData = [];
      for (const doc of snapshot.docs) {
        const { imgUrl } = doc.data();
        const imgRef = ref(storage, imgUrl);
        const imgSrc = await imgRef.getDownloadURL();
        galleryData.push(imgSrc);
      }
      setGallery(galleryData);
    });
  }, []);

//   useEffect(() => {
//     if(!app) return;
//     queryData(app).then(setImgData)
// }, [app])

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="galleryPage">
            <h2>Timeline of Self Portraits</h2>
            <div>
              {capturedImage && <img src={capturedImage}></img>}
            </div>
          {/* {images.map(image => (
            <img key={image} src={image} alt="selfie" />
          ))} */}
          <GalleryPost
          />
        {/* <div className="galleryWrapper">
          {gallery.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`img-${index}`} />
        ))} */}
          {/* <div>
          {imgData.map((letter) => (
                    <LetterPost
                        letterText={letter.letterText}
                        displayName={letter.displayName}
                    />
                    ))}
                <GalleryPost
                    imgUrl={img.src}
                  />
            </div> */}
            {/* <div className="galleryItem">
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
            </div> */}

            {/* <div className="galleryItem">
              <img src={imageSrc}></img>
              <p>{WebcamImage.imageSrc}</p>
            </div> */}
        {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Gallery;