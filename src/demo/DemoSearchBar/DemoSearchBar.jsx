/*
 * Created on Fri Dec 02 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AimoSearchBar from "@aimo.ui/aimo-searchbar";

import "./DemoSearchBar.scss";

const DemoSearchBar = () => {
  return (
    <div className="searchDemoContainer">
      <AimoSearchBar iconSide="left" className="searchDemo" />
    </div>
  );
};

export default DemoSearchBar;
