import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import filler1 from "../files/filler00001.png"
import filler2 from "../files/filler00002.png"
import filler3 from "../files/filler00003.png"
import filler4 from "../files/filler00004.png"
import filler5 from "../files/filler00005.png"
import filler6 from "../files/filler00006.png"
import filler7 from "../files/filler00007.png"
import filler8 from "../files/filler00008.png"
import filler9 from "../files/filler00009.png"
import filler10 from "../files/filler00010.png"
import filler11 from "../files/filler00011.jpg"
import filler12 from "../files/filler00012.png"
import filler13 from "../files/filler00013.png"
import { storage } from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Gallery({  }) {
  const [imageList, setImageList] = useState([])
  const [captionList, setCaptionList] = useState([])
  const storageRef = ref(storage, `selfies/`)
  // const docRef = addDoc(collection, `selfieCaptions`)

  useEffect(() => {
    listAll(storageRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url].sort())

        })
      })
    })
  }, [])


  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="galleryPage">
            <h2>Timeline of Self Portraits</h2>
            <div className="galleryWrapper" id="galleryWrapper">
              <div className="galleryItem">
                <img src={filler1} alt="filler-1" id="1433"></img>
                <p className="galleryCaption">“Portrait of a Man in a Turban” by Jan van Eyck 1433</p>
              </div>
              <div className="galleryItem">
                <img src={filler11} alt="filler-11" id="1500"></img>
                <p className="galleryCaption">Albrecht Durer's self-portrait c. 1500</p>
              </div>
              <div className="galleryItem">
                <img src={filler7} alt="filler-7" id="1839"></img>
                <p className="galleryCaption">Robert Cornelius daguerreotype selfie, 1839</p>
              </div>
              <div className="galleryItem">
                <img src={filler12} alt="filler-12" id="1889"></img>
                <p className="galleryCaption">Self-portrait without beard Vincent van Gogh 1889</p>
              </div>
              <div className="galleryItem">
                <img src={filler8} alt="filler-8" id="1900"></img>
                <p className="galleryCaption">self portrait c. 1900</p>
              </div>
              <div className="galleryItem">
                <img src={filler4} alt="filler-4" id="1914"></img>
                <p className="galleryCaption">self portrait c. 1914</p>
              </div>
              <div className="galleryItem">
                <img src={filler5} alt="filler-5" id="1966"></img>
                <p className="galleryCaption">the first selfie in space by Buzz Aldrin. 1966</p>
              </div>
              <div className="galleryItem">
                <img src={filler9} alt="filler-9" id="19662"></img>
                <p className="galleryCaption"></p>
              </div>
              <div className="galleryItem">
                <img src={filler6} alt="filler-6" id="1920"></img>
                <p className="galleryCaption">self portrait c. 1920</p>
              </div>
              <div className="galleryItem">
                <img src={filler3} alt="filler-3" id="2011"></img>
                <p className="galleryCaption">self portrait c. 2011</p>
              </div>
              <div className="galleryItem">
                <img src={filler10} alt="filler-10" id="2014"></img>
                <p className="galleryCaption">self portrait c. 2014</p>
              </div>
              <div className="galleryItem">
                <img src={filler13} alt="filler-13" id="2015"></img>
                <p className="galleryCaption">Curiosity rover's self portrait at Mount Sharp, Mars, 2015</p>
              </div>
              <div className="galleryItem">
                <img src={filler2} alt="filler-2" id="2016"></img>
                <p className="galleryCaption">self portrait c. 2016</p>
              </div>
              {imageList.map((url) => {
                return <div className="galleryItem">
                  <img src={url}></img>
                  <p className="galleryCaption"></p>
                  </div>
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;