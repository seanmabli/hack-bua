import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";
import { ref as databaseRef, set } from "firebase/database";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { database, storage } from "./firebase";
import { useAudioRecorder } from "react-audio-voice-recorder";

export function Patient() {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 320,
      height: 240,
    });
    writeUserData(imageSrc);
  }, [webcamRef]);

  function writeUserData(image) {
    const d = new Date();
    let time = d.getTime();
    set(databaseRef(database, "images/new"), {
      image: image,
    });
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const recorderControls = useAudioRecorder();

  React.useEffect(() => {
    const interval = setInterval(() => {
      recorderControls.stopRecording();
      recorderControls.startRecording();
      sendAudio();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function sendAudio() {
    uploadBytes(storageRef(storage, "audio"), recorderControls.recordingBlob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  return (
    <>
      <Navbar />
      <p class="cam-txt">Patient's Video Stream</p>
      <div class="videoContainer">
        <div>
          <Webcam
            class="cam-feed"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/webp"
          />
        </div>
      </div>
    </>
  );
}
