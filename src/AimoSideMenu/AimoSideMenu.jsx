/*
 * Copyright (c) 2023 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./AimoSideMenu.css";

const AimoSideMenu = ({
  compactView = true,
  containerClassName = "",
  headerClassName = "",
  headerPosition = "top",
  headerText = "Menu",
  hideCompactView = false,
  hideHeader = false,
  hideIcons = false,
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
  const [compact, setCompact] = useState(hideCompactView ? false : compactView);
  const [maxWidths, setMaxWidth] = useState({ full: -1, compact: -1 });
  const containerRef = useRef();
  let iconRef = null;

  useEffect(() => {
    if (maxWidths.compact < 0 && iconRef)
      setMaxWidth({
        ...maxWidths,
        compact: hideIcons ? 0 : iconRef.current.clientWidth,
      });
  }, []);

  useEffect(() => {
    setCompact(compactView);
  }, [compactView]);

  const renderMenuHeaderIcon = (isCompact, toggleCompact) => {
    if (hideIcons) return null;

    let icon = null;
    if (renderHeaderIcon) icon = renderHeaderIcon(isCompact, toggleCompact);
    else if (hideCompactView)
      icon = <span onClick={() => toggleCompact(false)}>☰</span>;
    else if (isCompact)
      icon = (
        <span
          onClick={() => {
            if (maxWidths.compact < 0 && iconRef)
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
            if (maxWidths.full < -1)
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
    if (hideIcons) return null;

    if (item.isSeparator) return renderRowSeparator(index);

    let ref = null;
    if (!iconRef) {
      iconRef = useRef();
      ref = iconRef;
    }

    return (
      <div
        key={index}
        className={`${
          item.onClick ? "sideMenuClickableItem" : ""
        } sideMenuItemIcon`}
        onClick={item.onClick ? () => item.onClick(item) : null}
        ref={ref}
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
  if (compact && maxWidths.compact >= 0) style["maxWidth"] = maxWidths.compact;
  else if (!compact && maxWidths.full >= 0) style["maxWidth"] = maxWidths.full;

  return (
    <div
      className={`sideMenuContainer 
      ${
        !hideHeader && headerPosition === "bottom"
          ? "sideMenuContainerBottom"
          : ""
      }
      ${
        compact
          ? hideIcons
            ? "sideMenuContainerHide"
            : "sideMenuContainerCompact"
          : "sideMenuContainerFull"
      } 
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
            const customRenderFunc = item.renderFunc
              ? item.renderFunc
              : renderItem
              ? renderItem
              : null;
            return (
              <div
                key={index}
                className={`sideMenuItem ${menuItemClassName} ${item.className}`}
              >
                {customRenderFunc && customRenderFunc(item, index, compact)}
                {!customRenderFunc && renderItemIcon(item, index)}
                {!customRenderFunc && (
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
  compactView: PropTypes.bool,
  containerClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  headerPosition: PropTypes.oneOf(["top", "bottom"]),
  headerText: PropTypes.string,
  hideCompactView: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideIcons: PropTypes.bool,
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
