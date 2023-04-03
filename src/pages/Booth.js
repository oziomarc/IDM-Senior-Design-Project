import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// import Webcam from "react-webcam";
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
//   authDomain: "photobooth-7ee4c.firebaseapp.com",
//   projectId: "photobooth-7ee4c",
//   storageBucket: "photobooth-7ee4c.appspot.com",
//   messagingSenderId: "343204330461",
//   appId: "1:343204330461:web:398d0e337c44bec2cf9434"
// };

function Booth({ app, setCapturedImage, capturedImage, imgUrl }) {
  const navigate = useNavigate()
   const [webcam, setWebcam] = useState(null);
   const [active, setActive] = React.useState(true);
   const [capturedImageUrl, setCapturedImageUrl] = useState('');

  useEffect(() => {
     const webcamElement = document.getElementById("webcam");
     const canvasElement = document.getElementById("canvas");
     const snapSoundElement = document.getElementById("snapSound");

     const webcamInstance = new Webcam(
       webcamElement,
       "user",
       canvasElement,
       snapSoundElement
     );

     setWebcam(webcamInstance);

     return () => {
       webcamInstance.stop();
     };
   }, []);

   const handlePermission = () => {
    setActive(!active)
    if (webcam && active) {
      webcam
        .start()
        .then(() => {
          console.log("webcam started");
        })
        .catch((error) => {
          console.log(error);
        })
        }
    else {
        webcam.stop()
    }
  };
  const handleCapture = () => {
    if (webcam) {
      const picture = webcam.snap();
      if (picture == null) return;
      // convert base64 to png
      const imageData = picture.split(",")[1];
      const image = new Image();
      image.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      canvas.toBlob((blob) => {
        const file = new File([blob], "filename.png", { type: "image/png" });
        const imageRef = ref(storage, `selfies/${Date.now()}.png`, { contentType: "image/png" });
        uploadBytes(imageRef, file, { contentType: "image/png" }).then(() => {
          getDownloadURL(imageRef).then((url) => {
            console.log(url)
          });
          // alert("image uploaded");
        });
      }, "image/png");
    };
    image.src = "data:image/png;base64," + imageData;
  }
}

  const addToGallery = (url) => {
    navigate("/gallery")
    // const galleryWrapper = React.document.getElementById('galleryWrapper')
    // const galleryItem = document.createElement('div')
    // galleryItem.classList.add('galleryItem')
    // const galleryImage = document.createElement('img')
    // galleryImage.src = url
    // galleryWrapper.appe

  }
  
  
  return (
    <>
      <Header />
       <div className="pageWrapper">
         <div className="boothWrapper">
           <div className="permissionButton">
             <FormGroup>
                 <FormControlLabel control={<Switch default />} onClick={handlePermission} label="Camera Access" />
             </FormGroup>
           </div>
           <div className="cameraCanvasWrapper">
            <video id="webcam" className="cameraStream" autoPlay playsInline width="384" height="576"></video>
            <canvas id="canvas" width="384" height="576" className="imageCanvas"></canvas>
            <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio>
          </div>
            <div className="buttons">
             <button id="" onClick={handleCapture}>Take photo</button>
             
                 <button onClick={addToGallery} style={{ textDecoration: 'none' } } >Add to Gallery**</button>
             
             <button id="">Print</button>
             <a id="photo" download="selfie.png">
             </a>
          </div>
      </div>
        </div>
    </>
  );
}


export default Booth;