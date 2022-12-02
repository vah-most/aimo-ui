/*
 * Created on Tue Aug 09 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";

import AimoSideMenu from "@aimo.ui/aimo-sidemenu";

import DemoTable from "./DemoTable";
import DemoTitledInput from "./DemoTitledInput";

import "./MainPage.scss";

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const menuItems = [
    {
      renderIcon: () => <span className="menuIcon">🏼</span>,
      text: "AimoTable",
      onClick: () => {
        setCurrentPage("DemoTable");
      },
    },
    {
      renderIcon: () => <span className="menuIcon">⇿</span>,
      text: "AimoPagination",
      onClick: () => {
        setCurrentPage("DemoTable");
      },
    },
    {
      renderIcon: () => <span className="menuIcon">✎</span>,
      text: "AimoTitledInput",
      onClick: () => {
        setCurrentPage("DemoTitledInput");
      },
    },
    {
      isSeparator: true,
    },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "DemoTable":
        return <DemoTable />;
      case "DemoTitledInput":
        return <DemoTitledInput />;
      default:
        return null;
    }
  };

  return (
    <div className="appContainer">
      <AimoSideMenu headerText="Aimo-UI Components" menuItems={menuItems} />
      <div className="appBody">
        <h1 className="appTitle">Welcome to Aimo-UI Components Demo Page</h1>
        <div className="appContent">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MainPage;
