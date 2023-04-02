import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Patient } from "./patient";
import { Doctor } from "./doctor";
import "./index.css"


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/patient" />}
        />
        <Route
          path="/patient"
          element={<Patient />}
        />
        <Route
          path="/doctor"
          element={<Doctor />}
        />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  </>
);
