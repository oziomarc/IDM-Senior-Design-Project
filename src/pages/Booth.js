import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
// import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Webcam from "react-webcam";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
  authDomain: "photobooth-7ee4c.firebaseapp.com",
  projectId: "photobooth-7ee4c",
  storageBucket: "photobooth-7ee4c.appspot.com",
  messagingSenderId: "343204330461",
  appId: "1:343204330461:web:398d0e337c44bec2cf9434"
};

function Booth({ app, setCapturedImage, capturedImage, imgUrl }) {
  const [showWebcam, setShowWebcam] = useState(false);
  const [appInitialized, setAppInitialized] = useState();
  const navigate = useNavigate()
  const [webcam, setWebcam] = useState(null);
  const [active, setActive] = React.useState(true);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAppInitialized(true)
  },[]) 

  const [img, setImg] = useState(null);
    const webcamRef = useRef(null);
  
    const videoConstraints = {
      width: 384,
      height: 576,
      facingMode: "user",
    };
  
    const capture = useCallback((e) => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImg(imageSrc);
    }, []);

    const handlePermission = useCallback(() => {
      setShowWebcam(!showWebcam);
    }, [showWebcam]);

  const addToGallery = (picture) => {
    const appending = React.createElement('img');
    appending.src = picture.url();
  }

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="boothWrapper">

      <div className="Container">
        <div className="permissionButton">
          <FormGroup>
              <FormControlLabel control={<Switch false />} onClick={handlePermission} label="Camera Access" />
          </FormGroup>
        </div>
        {showWebcam && (
          <div className="imageCanvas">
            <Webcam
              audio={false}
              mirrored={true}
              height={576}
              width={384}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              />
          </div>    
          
          )}
        {img === null ? (
          <div className="buttons">
            <button onClick={capture}>Capture photo</button>
          </div>
        ) : (
          <>
            <img src={img} alt="screenshot" />
            <div className="buttons">
              {/* <button onClick={capture}>Capture Photo</button> */}
              <Link to="/gallery" onClick={addToGallery} style={{ textDecoration: 'none' }}>
                  <button id="" >Add to Gallery</button>
              </Link>
              <button id="">Print</button>
              <button onClick={() => setImg(null)}>Retake</button>
            </div>
          </>
        )}
      </div>
        </div>
      </div>
    </>
  );
}

export default Booth;