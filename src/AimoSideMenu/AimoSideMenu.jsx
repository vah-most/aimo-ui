/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./AimoSideMenu.css";

const AimoSideMenu = ({
  containerClassName = "",
  headerClassName = "",
  headerPosition = "top",
  headerText = "Menu",
  hideCompactView = false,
  hideHeader = false,
  iconContainerClassName = "",
  menuItemClassName = "",
  menuItems = [],
  renderHeaderIcon,
  renderHeaderText,
  renderItem,
  renderSeparator,
  rtl = false,
  textContainerClassName = "",
}) => {
  if (hideHeader) hideCompactView = true;
  const [compact, setCompact] = useState(hideCompactView ? false : true);
  const [maxWidths, setMaxWidth] = useState({ full: 0, compact: 0 });
  const containerRef = useRef();
  const iconRef = useRef();

  useEffect(() => {
    if (maxWidths.compact === 0)
      setMaxWidth({
        ...maxWidths,
        compact: iconRef.current.clientWidth,
      });
  }, []);

  const renderMenuHeaderIcon = (isCompact, toggleCompact) => {
    let icon = null;
    if (renderHeaderIcon) icon = renderHeaderIcon(isCompact, toggleCompact);
    else if (hideCompactView)
      icon = <span onClick={() => toggleCompact(false)}>☰</span>;
    else if (isCompact)
      icon = (
        <span
          onClick={() => {
            if (maxWidths.compact === 0)
              setMaxWidth({
                ...maxWidths,
                compact: iconRef.current.clientWidth,
              });
            toggleCompact(false);
          }}
        >
          ≫
        </span>
      );
    else
      icon = (
        <span
          onClick={() => {
            if (maxWidths.full === 0)
              setMaxWidth({
                ...maxWidths,
                full: containerRef.current.clientWidth,
              });
            toggleCompact(true);
          }}
        >
          ≪
        </span>
      );

    return (
      <div
        className={`sideMenuHeaderIcon 
        ${hideCompactView ? null : "sideMenuClickableItem"}
        ${iconContainerClassName}`}
        ref={iconRef}
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
          <span>∎</span>
        )}
      </div>
    );
  };

  const renderItemText = (item, index) => {
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

  let style = {};
  if (rtl) style["flexDirection"] = "row-reverse";
  if (compact && maxWidths.compact > 0) style["maxWidth"] = maxWidths.compact;
  else if (!compact && maxWidths.full > 0) style["maxWidth"] = maxWidths.full;

  return (
    <div
      className={`sideMenuContainer 
      ${
        !hideHeader && headerPosition === "bottom"
          ? "sideMenuContainerBottom"
          : ""
      }
      ${compact ? "sideMenuContainerCompact" : "sideMenuContainerFull"} 
      ${containerClassName}`}
      ref={containerRef}
      style={style}
    >
      {!hideHeader && (
        <div className={`sideMenuHeader ${headerClassName}`}>
          <div className={`sideMenuItem ${menuItemClassName}`}>
            {renderMenuHeaderIcon(compact, setCompact)}
            <div
              className={`sideMenuItemText ${
                compact ? "sideMenuItemTextHidden" : ""
              }`}
            >
              {renderMenuHeaderText()}
            </div>
          </div>
          {renderRowSeparator()}
        </div>
      )}
      <div className="sideMenuItems">
        <div className="sideMenuFull">
          {menuItems.map((item, index) => {
            if (item.isSeparator) return renderRowSeparator(index);
            return (
              <div
                key={index}
                className={`sideMenuItem ${menuItemClassName} ${item.className}`}
              >
                {renderItem && renderItem(item, index, compact)}
                {!renderItem && renderItemIcon(item, index)}
                {!renderItem && (
                  <div className={`sideMenuItemText`}>
                    {renderItemText(item, index)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

AimoSideMenu.propTypes = {
  containerClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  headerPosition: PropTypes.oneOf(["top", "bottom"]),
  headerText: PropTypes.string,
  hideCompactView: PropTypes.bool,
  hideHeader: PropTypes.bool,
  iconContainerClassName: PropTypes.string,
  menuItemClassName: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderHeaderIcon: PropTypes.func,
  renderHeaderText: PropTypes.func,
  renderItem: PropTypes.func,
  renderSeparator: PropTypes.func,
  rtl: PropTypes.bool,
  textContainerClassName: PropTypes.string,
};

export default AimoSideMenu;
