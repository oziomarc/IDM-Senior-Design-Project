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
      document.querySelector("#download-photo").href = picture;
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
          <div className="cameraStream">
            <video
              id="webcam"
              autoPlay
              playsInline
              width="384"
              height="576"
            ></video>
            <canvas id="canvas" className="canvas"></canvas>
          </div>
          <div className="captureButton">
            <button onClick={handleCapture}>Take photo</button>
            <a id="download-photo" download="selfie.png">
              Download photo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
