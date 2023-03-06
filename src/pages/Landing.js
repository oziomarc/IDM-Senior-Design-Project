import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Webcam from "webcam-easy";
import { Switch, FormGroup, FormControlLabel } from '@mui/material';

function Landing() {
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
      document.querySelector("#photo").href = picture;
    }
  };

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <h2>Landing</h2>
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
          
          <div className="captureButton">
            <button id="captureButton" onClick={handleCapture}>Take photo</button>
            <a id="photo" download="selfie.png">
            </a>
            {/* <a id="download-photo" download="selfie.bmp"></a> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
