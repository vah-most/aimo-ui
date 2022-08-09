/*
 * Created on Tue Aug 09 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import AimoIcon from "./AimoIcon";

import "./AimoSideMenu.scss";

const AimoSideMenu = ({
  containerClassName,
  headerText = "Menu",
  hideCompactView = false,
  hideHeader = false,
  iconContainerClassName,
  menuItems = [],
  renderHeaderIcon,
  renderHeaderText,
  renderSeparator,
  rtl = false,
  textContainerClassName,
}) => {
  if (hideHeader) hideCompactView = true;
  const [compact, setCompact] = useState(hideCompactView ? false : true);

  const renderMenuHeaderIcon = (isCompact, toggleCompact) => {
    if (hideHeader) return null;

    let icon = null;
    if (renderHeaderIcon) icon = renderHeaderIcon();
    else if (isCompact || hideCompactView)
      icon = <AimoIcon name="bars" onClick={() => toggleCompact(false)} />;
    else
      icon = (
        <AimoIcon name="toggle-left" onClick={() => toggleCompact(true)} />
      );

    return (
      <div
        className={`sideMenuHeaderIcon 
        ${hideCompactView ? null : "sideMenuClickableItem"}
        ${iconContainerClassName}`}
      >
        {icon}
      </div>
    );
  };

  const renderMenuHeaderText = () => {
    if (hideHeader) return null;

    let menuHeaderText = "Menu";
    if (renderHeaderText) menuHeaderText = renderHeaderText();
    else if (headerText) menuHeaderText = headerText;

    return (
      <div className={`sideMenuHeaderText ${rtl ? "sideMenuItemRtl" : ""}`}>
        {menuHeaderText}
      </div>
    );
  };

  const renderItemIcon = (item, index) => {
    if (item.isSeparator) return renderRowSeparator(index);

    return (
      <div
        key={index}
        className={`${
          item.onClick ? "sideMenuClickableItem" : ""
        } sideMenuItemIcon`}
        onClick={item.onClick ? () => item.onClick(item) : null}
      >
        {typeof item.renderIcon === "function" ? (
          item.renderIcon()
        ) : (
          <AimoIcon name="square" />
        )}
      </div>
    );
  };

  const renderItemText = (item, index) => {
    if (item.isSeparator) return renderRowSeparator(index);

    let itemText = null;
    if (typeof item.renderText === "function") itemText = item.renderText();
    else if (item.text) itemText = <span>{item.text}</span>;

    return (
      <div
        key={index}
        className={`${
          item.onClick ? "sideMenuClickableItem" : ""
        } sideMenuItemText ${
          rtl ? "sideMenuItemRtl" : ""
        } ${textContainerClassName}`}
        onClick={item.onClick ? () => item.onClick(item) : null}
      >
        {itemText}
      </div>
    );
  };

  const renderRowSeparator = (key) => {
    if (renderSeparator) return renderSeparator(key);

    return <div key={key} className="sideMenuSeparator" />;
  };

  return (
    <div
      className={`sideMenuContainer 
      ${compact ? "sideMenuContainerCompact" : "sideMenuContainerFull"} 
      ${containerClassName}`}
      style={rtl ? { flexDirection: "row-reverse" } : null}
    >
      <div className="sideMenuCompact">
        {renderMenuHeaderIcon(compact, setCompact)}
        {renderRowSeparator()}
        {menuItems.map((item, index) => renderItemIcon(item, index))}
      </div>
      <div className={compact ? "sideMenuFullHidden" : "sideMenuFull"}>
        {renderMenuHeaderText()}
        {renderRowSeparator()}
        {menuItems.map((item, index) => renderItemText(item, index))}
      </div>
    </div>
  );
};

export default AimoSideMenu;
