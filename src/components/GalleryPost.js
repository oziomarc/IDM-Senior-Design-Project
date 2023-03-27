import React from "react";
import { Link } from "react-router-dom";
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

function GalleryPost ({imgUrl}) {
    return (
        <div className="galleryWrapper">
            <div className="galleryItem">
              <img src={filler1} alt="filler-1" id="1433"></img>
            </div>
            <div className="galleryItem">
              <img src={filler7} alt="filler-7" id="1839"></img>
            </div>
            <div className="galleryItem">
              <img src={filler8} alt="filler-8" id="1900"></img>
            </div>
            <div className="galleryItem">
              <img src={filler4} alt="filler-4" id="1914"></img>
            </div>
            <div className="galleryItem">
              <img src={filler5} alt="filler-5" id="1966"></img>
            </div>
            <div className="galleryItem">
              <img src={filler9} alt="filler-9" id="1966"></img>
            </div>
            <div className="galleryItem">
              <img src={filler6} alt="filler-6" id="1920"></img>
            </div>
            <div className="galleryItem">
              <img src={filler3} alt="filler-3" id="2011"></img>
            </div>
            <div className="galleryItem">
              <img src={filler10} alt="filler-10" id="2014"></img>
            </div>
            <div className="galleryItem">
              <img src={filler2} alt="filler-2" id="2016"></img>
            </div>
            <div className="galleryItem">
                <img src={imgUrl} alt="newselfie"></img>
            </div>
        </div>
    );
}

export default GalleryPost;