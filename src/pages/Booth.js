import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

function Booth() {
  const navigate = useNavigate()
   const [webcam, setWebcam] = useState(null);
   const [active, setActive] = React.useState(true);

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
            console.log("image ref: "+imageRef)
            console.log("file: "+file)
            console.log("url: "+url)
          });
        });
      }, "image/png");
    };
    image.src = "data:image/png;base64," + imageData;
  }
}

  const addToGallery = () => {
    navigate("/gallery")
  }
  
  const printImage = () => {
    const printedImage = new Image();

  }
  return (
    <>
      <Header />
          <div className="boothWrapper">
            <div className="boothWrapper-2">
              <div className="permissionButton">
                <FormGroup>
                    <FormControlLabel control={<Switch default />} onClick={handlePermission} label="Camera Access" />
                </FormGroup>
              </div>
              <div className="cameraCanvasWrapper">
                <video id="webcam" className="cameraStream" autoPlay playsInline width="384" height="576"></video>
                <canvas id="canvas" width="384" height="576" className="imageCanvas"></canvas>
              </div>
            
            <div className="buttons">
             <button id="" onClick={handleCapture}>Take photo</button>
             <button onClick={addToGallery} style={{ textDecoration: 'none' } }>Add to Gallery</button>
             <button id="print-button" onClick={printImage}>Print</button>
            </div>
          </div>
        </div>
    </>
  );
}


export default Booth;