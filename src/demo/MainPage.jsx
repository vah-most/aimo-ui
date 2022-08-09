/*
 * Created on Tue Aug 09 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import Aimo from "../index";

import "./MainPage.scss";

const menuItems = [
  {
    renderIcon: () => <Aimo.AimoIcon name="info" />,
    text: "AimoIcon",
  },
  {
    renderIcon: () => <Aimo.AimoIcon name="server" />,
    text: "AimoSideMenu",
  },
  {
    renderIcon: () => <Aimo.AimoIcon name="table" />,
    text: "AimoTable",
  },
  {
    isSeparator: true,
  },
];

const MainPage = () => {
  return (
    <div className="appContainer">
      <Aimo.AimoSideMenu
        headerText="Aimo-UI Components"
        menuItems={menuItems}
      />
      <div className="appBody">
        <h1 className="appTitle">
          <Aimo.AimoIcon name="sitemap" className="appTitleIcon" />
          Welcome to Aimo-UI Component Library Tutorial
        </h1>
      </div>
    </div>
  );
};

export default MainPage;
