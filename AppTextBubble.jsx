/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";

import AppIcon from "./AppIcon";

import "./AppTextBubble.scss";

function AppTextBubble({
  backgroundColor,
  className = "",
  onDelete,
  style = {},
  text,
}) {
  const [displayDelete, setDisplayDelete] = useState(false);

  return (
    <div
      className={`textBubble ${className}`}
      onMouseOut={() => {
        setDisplayDelete(false);
      }}
      onMouseOver={() => {
        setDisplayDelete(true);
      }}
      style={{ backgroundColor: backgroundColor, ...style }}
    >
      {onDelete && (
        <div
          className="textBubbleDelete"
          onClick={() => onDelete && onDelete(text)}
          style={
            displayDelete ? { visibility: "visible" } : { visibility: "hidden" }
          }
        >
          <AppIcon name="times" />
        </div>
      )}
      <span>{text}</span>
    </div>
  );
}

export default AppTextBubble;
