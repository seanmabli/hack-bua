import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";
import { ref, set } from "firebase/database";
import { database } from "./firebase";

export function Patient() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({width: 600, height: 400});
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (  
    <>
      <Navbar />
      <Webcam audio={true} ref={webcamRef} screenshotFormat="image/jpeg" />
    </>
  );
}
