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
import filler14 from "../files/filler00014.png"
import filler15 from "../files/filler00015.png"
import filler16 from "../files/filler00016.png"
import filler17 from "../files/filler00017.jpeg"
import filler18 from "../files/filler00018.jpg"
import { storage } from "../firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function Gallery({ app, captionText }) {
  const [imageList, setImageList] = useState([])
  const [captionData, setCaptionData] = useState([])
  const storageRef = ref(storage, `selfies/`)
  const captionsRef = ref(storage, `captions/`)

  useEffect(() => {
    listAll(storageRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url].sort().reverse())
        })
      })
    })

    listAll(captionsRef).then((response) => {
      response.items.forEach((item) => {
        captionData.map((caption) => (
          caption.captionData
        ))
      })
    })
  }, [])

  captionData.sort().reverse()

  const queryData = async (app) => {
    if(!app) return [];
    const db = getFirestore(app); 
    const querySnapshot = await getDocs(collection(db, "captions"))
    const data = []
    querySnapshot.forEach((doc) => {
        const pushData = doc.data()
        data.push(pushData)
    });
    return data;
  }

  useEffect(() => {
    if(!app) return;
    queryData(app).then(setCaptionData)
  }, [app])

  const fontArray = ["font-1","font-2","font-3","font-4","font-5"]
  const rotation = ["r1", "r2", "r3", "r4"]
  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="galleryPage">
            <h2>Timeline of Self Portraits</h2>
            <div className="galleryWrapper" id="galleryWrapper">
              {imageList.map((url, index) => {
                const randomKey = Math.floor(Math.random()*4)
                const caption = captionData[index] ? captionData[index].captionText : " ";
                return (
                  <div key={index}>
                    <div className="galleryItem" id={rotation[randomKey]}>
                      <img src={url} />
                      <p className="galleryCaption" id={fontArray[randomKey]}>
                        {caption}
                      </p>
                  </div>
                  </div>
                );
              })}
              <div className="galleryItem" id="r4">
                <img src={filler14} alt="filler-2"></img>
                <p className="galleryCaption" id="font-3">met gala bathroom selfie 2017</p>
              </div>
              <div className="galleryItem" id="r1">
                <img src={filler2} alt="filler-2" ></img>
                <p className="galleryCaption" id="font-3">self portrait c. 2016</p>
              </div>
              <div className="galleryItem" id="r4">
                <a href="https://www.nbcnews.com/news/us-news/biden-takes-selfie-obama-n82626" target="_blank"><img src={filler16} alt="filler-16" ></img></a>
                <p className="galleryCaption" id="font-5">the Oscars selfie that broke twitter. 2014.</p>
              </div>
              <div className="galleryItem" id="r2">
                <a href="https://www.nbcnews.com/news/us-news/biden-takes-selfie-obama-n82626" target="_blank"><img src={filler10} alt="filler-10" ></img></a>
                <p className="galleryCaption" id="font-5">Joe Biden's first selfie on Instagram, 2014</p>
              </div>
              <div className="galleryItem" id="r3">
                <a href="https://www.instagram.com/p/BDas2/?utm_source=ig_embed&ig_rid=b8c1adad-4d40-4d2e-98cc-2badea8ce8aa" target="_blank"><img src={filler3} alt="filler-3" ></img></a>
                <p className="galleryCaption" id="font-1">the first #selfie on instagram, 2011</p>
              </div>
              <div className="galleryItem" id="r4">
                <img src={filler9} alt="filler-9" ></img>
                <p className="galleryCaption" id="font-1">George Harrison at the Taj Mahal, 1966</p>
              </div>
              <div className="galleryItem" id="r2">
                <img src={filler5} alt="filler-5" id="font-4"></img>
                <p className="galleryCaption" id="font-4">the first selfie in space by Buzz Aldrin, 1966</p>
              </div>
              <div className="galleryItem" id="r1">
                <a href="https://collections.mcny.org/CS.aspx?VP3=SearchResult&IT=Thumb_Grid_M_Details_NoToolTip&IID=2F3XC58B7Q_U" target="_blank"><img src={filler6} alt="filler-6"></img></a>
                <p className="galleryCaption" id="font-2">photographers posing together for a selfie 1920</p>
              </div>
              <div className="galleryItem" id="r3">
                <a href="https://www.theatlantic.com/technology/archive/2013/11/1913-duchess-anastasia-takes-a-selfie/281853/" target="_blank"><img src={filler4} alt="filler-4"></img></a>
                <p className="galleryCaption" id="font-5"> Duchess Anastasia of Russia, 1913</p>
              </div>
              <div className="galleryItem" id="r1">
                <img src={filler8} alt="filler-8" ></img>
                <p className="galleryCaption" id="font-1">self portrait c. 1900</p>
              </div>
              <div className="galleryItem" id="r3">
                <img src={filler18} alt="filler-18" ></img>
                <p className="galleryCaption" id="font-5">unidentified woman takes a mirror selfie. 1900</p>
              </div>
              <div className="galleryItem" id="r4">
                <img src={filler12} alt="filler-12" ></img>
                <p className="galleryCaption" id="font-3">Self-portrait without beard Vincent van Gogh 1889</p>
              </div>
              <div className="galleryItem" id="r2">
                <a href="https://blogs.loc.gov/loc/2022/07/robert-cornelius-and-the-first-selfie/" target="_blank"><img src={filler7} alt="filler-7"></img></a>
                <p className="galleryCaption" id="font-4">Robert Cornelius daguerreotype selfie, 1839</p>
              </div>
              <div className="galleryItem" id="r3">
                <img src={filler11} alt="filler-11" ></img>
                <p className="galleryCaption" id="font-5">Albrecht Durer's self-portrait c. 1500</p>
              </div>
              <div className="galleryItem" id="r1">
                <img src={filler1} alt="filler-1" ></img>
                <p className="galleryCaption" id="font-2">“Portrait of a Man in a Turban” by Jan van Eyck 1433</p>
              </div>
              <div className="galleryItem" id="r4">
                <a href="https://en.wikipedia.org/wiki/Bek_(sculptor)" target="_blank"><img src={filler15}></img></a>
                <p className="galleryCaption" id="font-1">self-portrait stela by Bek 1353 BC</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;