/*
 * Created on Thu Aug 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import ReactDOM from "react-dom/client";
import Aimo from "../";

import "./demo.scss";

const App = () => {
  return (
    <React.Fragment>
      <h1 className="appTitle">
        <Aimo.AimoIcon name="sitemap" className="appTitleIcon" />
        Welcome to Aimo Component Library Demo
      </h1>
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
