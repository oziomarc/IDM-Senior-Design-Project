import React, { useState } from "react";
import Header from "../components/Header";
import Webcam from 'webcam-easy';

function Landing() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false);

  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const handlePermissionRequest = () => {
    Webcam.getMediaStream()
      .then(() => setPermissionGranted(true))
      .catch((error) => console.log(error));
  };

  const handleCaptureImage = () => {
    const imageSrc = webcamRef.current.snap();
    setImageCaptured(true);
    document.querySelector('#download-photo').href = imageSrc;
  };

  return (
    <>
      <Header />
      <div className="pageWrapper">
        <h2>Landing</h2>
        <div className="boothWrapper">
          {!permissionGranted && (
            <button onClick={handlePermissionRequest}>Grant Camera Permission</button>
          )}
          {permissionGranted && !imageCaptured && (
            <div className="cameraStream">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <button onClick={handleCaptureImage}>Capture Image</button>
            </div>
          )}
          {imageCaptured && (
            <div>
              <img id="download-photo" alt="captured" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Landing;
