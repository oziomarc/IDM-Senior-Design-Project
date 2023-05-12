import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import filler1 from "../files/filler00001.png"
import filler2 from "../files/filler00002.png"
import filler3 from "../files/filler00003.png"
import filler4 from "../files/filler00004.jpg"
import filler5 from "../files/filler00005.png"
import filler6 from "../files/filler00006.png"
import filler7 from "../files/filler00007.png"
import filler9 from "../files/filler00009.png"
import filler10 from "../files/filler00010.png"
import filler11 from "../files/filler00011.jpg"
import filler12 from "../files/filler00012.png"
import filler14 from "../files/filler00014.png"
import filler15 from "../files/filler00015.png"
import filler16 from "../files/filler00016.png"
import filler17 from "../files/filler00017.jpeg"
import filler18 from "../files/filler00018.jpg"
import filler19 from "../files/filler00019.png"
import babyozi from "../files/babyozi.jpg";
import { storage } from "../firebase";
import { getFirestore, collection, orderBy, getDocs, query } from "firebase/firestore";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from "react-router-dom";
import {initializeApp} from "firebase/app"

function Gallery({  captionText }) {
  const [imageList, setImageList] = useState([])
  const [captionData, setCaptionData] = useState([])
  const storageRef = ref(storage, `selfies/`)
  const captionsRef = ref(storage, `captions/`)
  const [showButton, setShowButton] = useState([])


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

   const firebaseConfig = {
    apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
    authDomain: "photobooth-7ee4c.firebaseapp.com",
    projectId: "photobooth-7ee4c",
    storageBucket: "photobooth-7ee4c.appspot.com",
    messagingSenderId: "343204330461",
    appId: "1:343204330461:web:398d0e337c44bec2cf9434"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // const query = db.collection("captions").orderBy("keyValue", "asc");

  // query.get().then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     const captionData = doc.data();
  //     // Do something with the captionData object.
  //   });
  // });

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

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    const scrollVisibility = () => {
      window.pageYOffset > 300 ? setShowButton(true) : setShowButton(false)
    }
    window.addEventListener('scroll', scrollVisibility);

    return () => {
      window.removeEventListener('scroll', scrollVisibility);
    }
  }, [])

  const fontArray = ["font-1","font-2","font-3","font-4","font-5"]
  const rotation = ["r1", "r2", "r3", "r4"]
  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="galleryPage">

          {showButton && (
            <div id="back-to-top-button">
              <Link to="/gallery">
                <KeyboardArrowUpIcon onClick={scrollToTop}style={{ color: '#c8b5df', fontSize: 50 }}/>
              </Link>
            </div>
          )}
            
            <h2>Gallery of Self Portraits</h2>
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
                <p className="galleryCaption" id="font-3">met gala bathroom selfie. 2017</p>
              </div>
              <div className="galleryItem" id="r1">
                <img src={filler2} alt="filler-2" ></img>
                <p className="galleryCaption" id="font-3">Blake Lively & Taylor Swift (2016)</p>
              </div>
              <div className="galleryItem" id="r4">
                <a href="https://www.nbcnews.com/news/us-news/biden-takes-selfie-obama-n82626" target="_blank"><img src={filler16} alt="filler-16" ></img></a>
                <p className="galleryCaption" id="font-5">the Oscars selfie that broke twitter. 2014.</p>
              </div>
              <div className="galleryItem" id="r2">
                <a href="https://www.nbcnews.com/news/us-news/biden-takes-selfie-obama-n82626" target="_blank"><img src={filler10} alt="filler-10" ></img></a>
                <p className="galleryCaption" id="font-5">Joe Biden's first selfie on Instagram (2014)</p>
              </div>
              <div className="galleryItem" id="r1">
                <img src={babyozi} alt="baby ozi" ></img>
                <p className="galleryCaption" id="font-3">ozi's first selfie, 2011</p>
              </div>
              <div className="galleryItem" id="r3">
                <a href="https://www.instagram.com/p/BDas2/?utm_source=ig_embed&ig_rid=b8c1adad-4d40-4d2e-98cc-2badea8ce8aa" target="_blank"><img src={filler3} alt="filler-3" ></img></a>
                <p className="galleryCaption" id="font-1">the first #selfie on instagram, 2011</p>
              </div>
              <div className="galleryItem" id="r4">
                <img src={filler9} alt="filler-9" ></img>
                <p className="galleryCaption" id="font-2">George Harrison at the Taj Mahal, 1966</p>
              </div>
              <div className="galleryItem" id="r2">
                <img src={filler5} alt="filler-5" id="font-4"></img>
                <p className="galleryCaption" id="font-4">the first selfie in space by Buzz Aldrin, 1966</p>
              </div>
              <div className="galleryItem" id="r3"><a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.smithsonianmag.com%2Fsmart-news%2Fvivian-maier-photographer-180980267%2F&psig=AOvVaw0NwyPqCzKZspCBH77K5Q1a&ust=1683763612275000&source=images&cd=vfe&ved=0CBAQ3YkBahcKEwiIysu0uun-AhUAAAAAHQAAAAAQAw" target="_blank"><img src={filler19} alt="filler-19"></img></a>
                <p className="galleryCaption" id="font-1">Vivian Maier, 1953.</p>
              </div>
              <div className="galleryItem" id="r4"><img src={filler17} alt="filler-17"></img>
                <p className="galleryCaption" id="font-3">Japanese couple takes a selfie c. 1920</p>
              </div>
              <div className="galleryItem" id="r1">
                <a href="https://collections.mcny.org/CS.aspx?VP3=SearchResult&IT=Thumb_Grid_M_Details_NoToolTip&IID=2F3XC58B7Q_U" target="_blank"><img src={filler6} alt="filler-6"></img></a>
                <p className="galleryCaption" id="font-2">photographers posing together for a selfie 1920</p>
              </div>
              <div className="galleryItem" id="r2">
                <a href="https://www.theatlantic.com/technology/archive/2013/11/1913-duchess-anastasia-takes-a-selfie/281853/" target="_blank"><img src={filler4} alt="filler-4"></img></a>
                <p className="galleryCaption" id="font-5"> Duchess Anastasia of Russia, 1913</p>
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