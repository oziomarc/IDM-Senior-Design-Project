import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import heroVideo from "../files/capturing-humanity.mp4";

function Landing() {
  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="heroSection">
          <div>
          </div>
            <div className="define">
                <h3>self-portrait</h3>
                <h4>self-por·​trait</h4>
                <h4>noun</h4>
                <p>A self-portrait is a representation of an artist that is drawn, painted, photographed, or sculpted by that artist.</p>
                <h3>selfie</h3>
                <h4>sel·fie</h4>
                <h4>/ˈselfē/</h4>
                <h4>noun INFORMAL</h4>
                <p>A photograph that one has taken of oneself, typically one taken with a smartphone or webcam and shared via social media.</p>
            </div>    
        </div>
        <div id="about">
          <div id="about-text">
            <p>Capturing Humanity seeks to explore the practice of self-portraiture and its co-evolution alongside technology and culture.</p>

            <p>A self portrait used to be an extremely time consuming, involved, and costly process. Today, anyone with a smartphone can capture a photo of themselves (a selfie) anywhere at any time, and create a relic that will continue exist long after they cease to.</p> 

            <p>I invite you to think about this and more as you capture your own portrait on this website. Leave your signature as part of an ongoing archive of self-portraiture.</p>

          </div>
          <div className="buttons">
            <Link to="/booth" style={{ textDecoration: 'none' }}>
                <button id="capture">CAPTURE YOUR PORTRAIT</button>
            </Link>
          </div>
          {/* <div id="author">
            <img src={babyozi}></img>
            <p>The <a href="https://www.ozioma.xyz" target={"_blank"} >creator</a> of this website's rumored first selfie, taken on a Nintendo DSi (2011).</p>
          </div>   */}
        </div>
      </div>
    </>
  );
}

export default Landing;
