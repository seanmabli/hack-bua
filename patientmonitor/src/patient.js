import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";
import { ref, set } from "firebase/database";
import { database } from "./firebase";

export function Patient() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    writeUserData(time, imageSrc);
  }, [webcamRef, setImgSrc]);

  function writeUserData(time, image) {
    set(ref(database, "images/" + time), {
      image: image,
    });
  }

  const d = new Date();
  let time = d.getTime();

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
