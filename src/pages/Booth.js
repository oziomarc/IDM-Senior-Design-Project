import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

function Booth({ app, setCapturedImage, capturedImage }) {
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

    // Cleanup function to stop the webcam when the component unmounts
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
// ??????

  
  const handleCapture = () => {
    if (webcam) {
        const picture = webcam.snap();
        fetch("/save-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ image: picture })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              setCapturedImage(picture)
              // Navigate to the Gallery page
              navigate('/gallery')
            } else {
              console.log(data.error);
            }
          })
          .catch(error => console.log(error));
      }
  };

  const addToGallery = (picture) => {
    fetch("/save-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: picture })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCapturedImage(picture)
          // Navigate to the Gallery page
          window.location.href = "/gallery";
        } else {
          console.log(data.error);
        }
      })
      .catch(error => console.log(error));
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
          <div className="permissionButton">
            <FormGroup>
                <FormControlLabel control={<Switch default />} onClick={handlePermission} label="Camera Access" />
            </FormGroup>
          </div>
          <div className="cameraCanvasWrapper">
            <div className="cameraStream">
                <video id="webcam"></video>
            </div>
            <div className="imageCanvas">
                <canvas id="canvas" width="384" height="576"></canvas>
            </div>
          </div>
          
          <div className="buttons">
            <button id="" onClick={handleCapture}>Take photo</button>
            <Link to="/gallery" onClick={addToGallery} style={{ textDecoration: 'none' }}>
                <button id="" >Add to Gallery**</button>
                    {/* {uploadSuccessful && <p>image added!</p>}
                    {uploadSuccessful} */}
            </Link>
            <button id="">Print</button>
            <a id="photo" download="selfie.png">
            </a>
            {/* <a id="download-photo" download="selfie.bmp"></a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Booth;
