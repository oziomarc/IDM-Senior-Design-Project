import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Link } from "react-router-dom";

function Booth() {
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
              // Navigate to the Gallery page
              window.location.href = "/gallery";
            } else {
              console.log(data.error);
            }
          })
          .catch(error => console.log(error));
      }
  };

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
            <Link to="/gallery" style={{ textDecoration: 'none' }}>
                <button id="">Add to Gallery**</button>
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
