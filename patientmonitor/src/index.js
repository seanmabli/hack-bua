import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { Patient } from "./patient";
import { Doctor } from "./doctor";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
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
