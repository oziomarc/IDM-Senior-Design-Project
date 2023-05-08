import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Switch, FormGroup, FormControlLabel, createTheme } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AddCaptionForm from "./AddCaptionForm";
import applelogo from "../files/apple-logo.png";
import sticker1 from "../files/sticker-1.png";
import sticker4 from "../files/sticker-4.png";
import sticker2 from "../files/sticker-2.png";
import sticker3 from "../files/sticker-3.png";
import Header from "../components/Header";

function Booth(app) {
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
  const handleInputChange = (event) => {
    setInputValue(event.currentTarget.value);
  };

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const captionText = e.target.value;

    const docRef = await addDoc(collection(db, "captions"), {
      captionText,
  });
  
    // Upload the input value to Firebase
    // app.firestore().collection('captions').add({
    //   text: inputValue
    // });
  
    // Clear the input value
    setInputValue('');
    console.log(captionText)
  }, [app]);


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

  // const addCaption = (sendCaption) => {
  //   return (
  //     <>
  //         {/* <form className="captionForm" onSubmit={(e) => sendCaption(e)}>
  //             <label htmlFor="captionText" style={{fontSize: 24}}>Caption your photo.</label>
  //             <textarea type="text" id="galleryCaption" name="captionText" maxlength="55" placeholder="captionform?"></textarea>
  //             <button type="submit">done</button>
  //         </form> */}
  //     </>
  //   )
  // }

  // const sendCaption = useCallback(async (e) => {
  //   e.preventDefault();
  //   const db = getFirestore(app);
  //   const captionText = e.currentTarget.captionText.value;
  //   try {
  //       const docRef = await addDoc(collection(db, "captions"), {
  //           captionText,
  //       });
  //       // setPostSuccessful(true)
  //   } catch (e) {
  //       console.error("error adding document: ", e);
  //   }
  // }, [app])

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

  window.onload = function() {
    const submit = document.querySelector('.submit-button');
    const captionForm = document.querySelector('.captionForm');
    const captionText = document.querySelector('.caption-area');
  
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      const db = getFirestore(app);
  
      db.collection("captions").add({
        captionText: captionText.value,
      })
      .then(() => {
        captionForm.reset();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    });
  }

  // const captionForm = document.querySelector('.captionForm');
  // const submit = document.querySelector('.submit-button');
  // const captionText = document.querySelector('.caption-area');

  // window.onload = function() {
  //   submit.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     const db = getFirestore(app);
    
  //     db.collection(captionForm).addDoc(collection(db, "captions"), {
  //       captionText: captionText.value,
  //     })
  //   });
  // }

  // const formElement = document.querySelector('.captionForm');

  // formElement.addEventListener('submit', (e) => {
  //   e.preventDefault(); // Prevent the form from submitting
  //   console.log('Form submitted!');
  // });

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
                  <button onClick={() => setShowInput(true)} style={{ textDecoration: 'none' } }>Add Caption</button>
                  {showInput && (
                    <form class="captionForm">
                      {/* <input type="text" value={inputValue} onChange={handleInputChange} placeholder='55 characters'id="galleryCaption" name="captionText"/> */}
                      <textarea class="caption-area" placeholder="write a caption here then press submit" maxLength={55}/>
                      <button onclick="event.preventDefault();" class="submit-button" type="submit">Submit</button>
                    </form>
                  )}
                  <button onClick={addToGallery} style={{ textDecoration: 'none' } }>Add to Gallery</button>
                  
                  <button id="print-button" onClick={printImage}>Print</button>
                </div>
            </div>
            </div>
              
              </div>

          </div>
          <div className="addCaptionWrapper">
            
          </div>
          <div className="boothRow">
            <div className="boothRow-1">
              {/* <Link to="/"><img src={applelogo} alt="back button"/></Link> */}
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
            {/* <div className="boothRow-3" id="beepyFlash">
              <div id="b-3"></div>
            </div> */}
          </div>
          {/* <div className="stickers-2">
            <img src={sticker1} alt="stciker"/>
            <img src={sticker2} alt="stciker"/>
          </div>
          <div className="stickers">
            <img src={sticker3} alt="stciker"/>
            <img src={sticker4} alt="stciker"/>
          </div> */}
          
        </div>
    </>
  );
}


export default Booth;