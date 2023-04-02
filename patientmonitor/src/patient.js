import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";
import { ref as databaseRef, set } from "firebase/database";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { database, storage } from "./firebase";
import { useAudioRecorder } from "react-audio-voice-recorder";

export function Patient() {
  const webcamRef = React.useRef(null);
  const [audioEnabled, setAudioEnabled] = React.useState(true);

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

  function updateSruff() {
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
      <button onClick={recorderControls.startRecording}>Start Recording</button>
      <button onClick={updateSruff}> upload</button>
      <button onClick={recorderControls.stopRecording}>Start Recording</button>

    </>
  );
}
