import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";
import { ref, set } from "firebase/database";
import { database } from "./firebase";

export function Patient() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  let audioEnabled = true
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 320,
      height: 240,
    });
    setImgSrc(imageSrc);
    writeUserData(imageSrc);
  }, [webcamRef, setImgSrc]);

  function writeUserData(image) {
    const d = new Date();
    let time = d.getTime();
    set(ref(database, "images/new"), {
      image: image,
    });
  }
  React.useEffect(() => {
    const interval = setInterval(() => {
      capture();
      console.log("captured");
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <p class='cam-txt'>Patient's Video Stream</p>
      <div class="videoContainer">
        <div>
          <Webcam class="cam-feed" audio={audioEnabled} ref={webcamRef} screenshotFormat="image/webp" /> 
        </div>
      </div>
      <div class="btn-container">
        <div><button><i class="material-icons md-24" id="vid" onClick={
          () => {
            let vid = document.querySelector("#vid");
            vid.innerHTML = vid.innerHTML === "videocam" ? "videocam_off" : "videocam";
            let cam = document.querySelector(".cam-feed");
            cam.style.display = cam.style.display === "none" ? "block" : "none";
           }  
        } >videocam</i></button></div>
        <div><button><i class="material-icons md-24" id="mic" onClick={
          () => {
            let mic = document.querySelector("#mic");
            mic.innerHTML = mic.innerHTML === "mic" ? "mic_off" : "mic";
            audioEnabled = !audioEnabled;
           }
        } >mic</i></button></div>
      </div>
    </>
  );
}
