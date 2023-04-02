import { Navbar } from "./navbar";
import React from "react";
import Webcam from "react-webcam";

export function Patient() {
  return (
    <div>
      <Navbar />
      <p>Patient</p>
      <Webcam />
    </div>
  );
}
