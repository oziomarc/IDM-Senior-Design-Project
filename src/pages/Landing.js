import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import babyozi from "../files/babyozi.jpg"

function Landing() {
  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="heroSection">
            <div className="define-visible">
                <h3>self-portrait</h3>
                <h4>self-por·​trait</h4>
                <h4>noun</h4>
                <p>A self-portrait is a representation of an artist that is drawn, painted, photographed, or sculpted by that artist.</p>
            </div>
            <div className="define-hidden">
                <h3>selfie</h3>
                <h4>sel·fie</h4>
                <h4>/ˈselfē/</h4>
                <h4>noun INFORMAL</h4>
                <p>A photograph that one has taken of oneself, typically one taken with a smartphone or webcam and shared via social media.</p>
            </div>    
        </div>
        <div id="about">
          <div>
            <p>Capturing Humanity is an interactive installation that showcases the history of humanity through self-portraits, also known as 'selfies'. The project invites passersby to take self-portraits and contribute to a gallery and timeline of self-portraits throughout history. This creates a sense of connection and identity among people, while demonstration how human behavior has evolved alongside technology.</p>
            <p>The installation also aims to evoke a vintage, nostalgic feeling that is tied to the history of image capture. This is achieved through the website UI and a thermal printer that provides participants with a keepsake portrait, similar to a photo booth.</p>  
            <p>Overall, the project places the tradition of self-portraits within a larger context of human history and identity.</p>
          </div>
          <div id="author">
            <img src={babyozi}></img>
            <p>The <a href="https://www.ozioma.xyz" target={"_blank"} >creator</a> of this website's rumored first selfie, taken on a Nintendo DSi (2011).</p>
          </div>  
        </div>
        <div className="buttonClass">
            <Link to="/booth" style={{ textDecoration: 'none' }}>
                <p>CAPTURE YOUR LEGACY</p>
            </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
