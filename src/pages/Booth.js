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

  // useEffect(() => {
  //   const webcamElement = document.getElementById("webcam");
  //   const canvasElement = document.getElementById("canvas");
  //   const snapSoundElement = document.getElementById("snapSound");

  //   const webcamInstance = new Webcam(
  //     webcamElement,
  //     "user",
  //     canvasElement,
  //     snapSoundElement
  //   );

  //   setWebcam(webcamInstance);

  //   return () => {
  //     webcamInstance.stop();
  //   };
  // }, []);

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

    // const handlePermission = () => {
    //   setActive(!active);
    //   if (webcamRef && active) {
    //     webcamRef.current
    //       .start()
    //       .then(() => {
    //         console.log("webcam started");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     webcamRef.stop();
    //   }
    // };

  // const handlePermission = () => {
  //   setActive(!active)
  //   if (webcamRef && active) {
  //     webcam
  //       .start()
  //       .then(() => {
  //         console.log("webcam started");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //       }
  //   else {
  //     webcam.stop()
  //   }
  // };
  
  // const handleCapture = () => {
  //   if (webcam) {
  //     const picture = webcam.snap();
  //     console.log(picture)
  //       fetch("/save-image", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({ image: picture })
  //       })
  //         .then(response => response.json())
  //         .then(data => {
  //           if (data.success) {
  //             setCapturedImage(picture)
  //           } else {
  //             console.log(data.error);
  //           }
  //         })
  //         .catch(error => console.log(error));
  //     }
  // };

  const addToGallery = (picture) => {
    const appending = React.createElement('img');
    appending.src = picture.url();
    // if(picture){
    //   window.location.href = "/gallery";
    // } else {
    //   return appending;
    // }
  }

// ??????

//   const uploadImg = useCallback(async (e) => {
//     e.preventDefault();
//     const db = getFirestore(app);
//     const storage = getStorage();
//     const imageToUpload = e.currentTarget.imageToUpload.files[0];
//     // reference to current image
//     const imageRef = ref(storage, imageToUpload.name);
//     const message = e.currentTarget.message.value;
//     // const stampUrl = "";

//     try {
//         const docRef = await addDoc(collection(db, "images"), {
//             message,
//            // stampUrl,
//         });
//         setUploadSuccessful(true)
//     } catch (e) {
//         console.error("error adding document: ", e);
//     }
// }, [app])

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="boothWrapper">
          
          {/* <div className="cameraCanvasWrapper">
            <div className="cameraStream">
                <video id="webcam"></video>
            </div>
            <div className="imageCanvas">
                <canvas id="canvas" width="384" height="576"></canvas>
            </div>
          </div> */}

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
