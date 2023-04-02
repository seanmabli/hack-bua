import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";
import { ref, set } from "firebase/database";
import { database } from "./firebase";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export function Patient() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

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
          <Webcam class="cam-feed" audio={true} ref={webcamRef} screenshotFormat="image/webp" /> 
        </div>
      </div>
      <div class="btn-container">
        <div><button><i class="material-icons">camera</i></button></div>
        <div><button><i class="material-icons">mic</i></button></div>
      </div>
    </>
  );
}
