import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase";
import { BrowserRouter } from "react-router-dom";
import Login from "./login";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </React.Fragment>
  </>
);