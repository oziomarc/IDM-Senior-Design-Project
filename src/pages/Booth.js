import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Booth(app) {
  const navigate = useNavigate()
  const [webcam, setWebcam] = useState(null);
  const [active, setActive] = React.useState(true);

  useEffect(() => {
     const webcamElement = document.getElementById("webcam");
     const canvasElement = document.getElementById("canvas");
     const webcamInstance = new Webcam(webcamElement, "user", canvasElement);
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
      const countdownElement = document.getElementById("countdownElement");
      let countdown = 3;
      countdownElement.innerHTML = countdown;
      const countdownInterval = setInterval (() => {
        countdown--
        if (countdown === 0) {
          clearInterval(countdownInterval);
          countdownElement.innerHTML = "";
          const picture = webcam.snap();
          if (picture == null) return;
          // convert base64 to png
          const imageData = picture.split(",")[1];
          const image = new Image();
          image.onload = function() {
            const canvas = document.createElement("canvas");
            canvas.width = 384;
            canvas.height = 576;
            canvas.className = "imageCanvas"
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
        } else {
          countdownElement.innerHTML = countdown;
        }
      }, 1000);
    }
  }

  const addCaption = () => {
    return (
      <>
          <form className="captionForm" onSubmit={(e) => sendCaption(e)}>
              <label htmlFor="captionText" style={{fontSize: 24}}>Caption your photo.</label>
              <textarea type="text" id="galleryCaption" name="captionText" maxlength="140"></textarea>
              <button type="submit">done</button>
          </form>
      </>
    )
  }

  const sendCaption = useCallback(async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const captionText = e.currentTarget.captionText.value;
    try {
        const docRef = await addDoc(collection(db, `selfieCaptions/`), {
            captionText
        });
        // setPostSuccessful(true)
    } catch (e) {
        console.error("error adding document: ", e);
    }
  }, [app])

  const addToGallery = () => {
    navigate("/gallery")
  }
  
  const printImage = () => {
    const printedImage = new Image();
    // get the image url that was just captured
    // download the image to headerImages folder in src
    // run the image conversion processing code
    // save the header file to the folder
    // import header file to arduino code and then run it to print
    // ???

  }
  return (
    <>
          <div className="boothWrapper">
            <div className="boothWrapper-2">
              
              <div className="cameraCanvasWrapper">
                
                <video id="webcam" className="cameraStream" autoPlay playsInline width="384" height="576"></video>
                <canvas id="canvas" width="384" height="576" className=""></canvas>
              </div>
               <div className="countdowns">
                  <h1 id="countdownElement"></h1>
                </div>
              <div className="booth-buttons">
                <div className="permissionButton">
                    <FormGroup>
                        <FormControlLabel control={<Switch default color="default"/>} onClick={handlePermission} label="Camera" />
                    </FormGroup>
                </div>
                <div className="otherButtons">
                  <button id="" onClick={handleCapture}>Take Photo</button>
                  <button onClick={addToGallery} style={{ textDecoration: 'none' } }>Add to Gallery</button>
                  <button onClick={addCaption} style={{ textDecoration: 'none' } }>Caption</button>
                  <button id="print-button" onClick={printImage}>Print</button>
                </div>
              </div>

          </div>
          <div className="boothRow">
            <div className="boothRow-1">
              <button><Link to="/"> C.H.</Link></button>
            </div>
            <div className="boothRow-2">
              <div id="b-1"></div>
              <div id="b-2"></div>
            </div>
            <div className="boothRow-3" id="beepyFlash">
              <div id="b-3"></div>
            </div>
          </div>
          
        </div>
    </>
  );
}


export default Booth;