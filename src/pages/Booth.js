import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { Link } from "react-router-dom";
import {initializeApp} from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Header from "../components/Header";

function Booth() {
  const navigate = useNavigate()
  const [active, setActive] = React.useState(true);
  const webcamRef = React.useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const videoConstraints = {
    width: 384,
    height: 576,
    facingMode: "user",
  };
  
  const firebaseConfig = {
    apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
    authDomain: "photobooth-7ee4c.firebaseapp.com",
    projectId: "photobooth-7ee4c",
    storageBucket: "photobooth-7ee4c.appspot.com",
    messagingSenderId: "343204330461",
    appId: "1:343204330461:web:398d0e337c44bec2cf9434"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    const captionTextarea = e.currentTarget.querySelector('.caption-area');
    const captionText = captionTextarea.value;
    const keyValue = Date.now()
    try {
        const docRef = await addDoc(collection(db, `captions/`), {
            captionText,
            keyValue
        });
        captionTextarea.value = ''
    } catch (e) {
        console.error("error adding document: ", e);
    }
    
  }, [app])


    const capture = React.useCallback(() => {
      const countdownElement = document.getElementById("countdownElement");
      let countdown = 3;
      countdownElement.innerHTML = countdown;
      const countdownInterval = setInterval (() => {
        countdown--
        if (countdown === 0) {
          clearInterval(countdownInterval);
          countdownElement.innerHTML = "";
          const picture = webcamRef.current.getScreenshot()
          if (picture == null) return;
          const imageData = picture.split(",")[1];
          const image = new Image();
          image.src = "data:image/png;base64," + imageData;
          
          image.onload = function() {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
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
        } else {
          countdownElement.innerHTML = countdown;
        }
      }, 1000);
    }, [webcamRef]);

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
          <Header/>
          <div className="boothWrapper">
            <div className="boothWrapper-2"> 
            <div className="titleWrapper">
              <h2><i>Photo Booth</i></h2>

              <div className="view-and-controlsWrapper">

                <div className="cameraCanvasWrapper">
                  <div id="webcam" className="cameraStream" autoPlay playsInline ><Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    screenshotFormat="image/png"
                    screenshotQuality={1}
                    videoConstraints={videoConstraints}
                    imageSmoothing={false}
                  /></div>
                  <canvas id="canvas" width="384" height="576" className="canvas"></canvas>
                </div>

                <div className="countdowns">
                  <h1 id="countdownElement"></h1>
                </div>

              <div className="booth-buttons">
                <div className="otherButtons">
                  <button id="" onClick={capture}>Take Photo</button>
                  <button onClick={() => setShowInput(true)} style={{ textDecoration: 'none' } }>Add Caption*</button>
                  {showInput && (
                    <form className="captionForm" onSubmit={handleFormSubmit}>
                      <textarea className="caption-area" placeholder="write a caption here then press submit" maxLength={55}/>
                      <button className="submit-button" type="submit">Submit</button>
                    </form>)}
                  <button onClick={addToGallery} style={{ textDecoration: 'none' } }>Add to Gallery</button>
                  <button id="print-button" onClick={printImage}>Print Image</button>
                  
                </div>
              </div>
            </div>
          </div>

          </div>
          <div className="boothRow">
            <div className="boothRow-1">
              <Link to="/">
                <div className="back-button">
                  <KeyboardBackspaceIcon style={{ color: '#c8b5df', fontSize: 30 }}/>
                </div>
              </Link>
            </div>
            <div className="boothRow-2">
              <div id="b-1"></div>
              <div id="b-2"></div>
            </div>
        </div>    
          
        </div>
    </>
  );
}


export default Booth;