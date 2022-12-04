/*
 * Created on Wed Jul 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";

import "./AimoSearchBar.css";

const AimoSearchBar = ({
  className,
  iconSide = "left",
  inputClassName,
  onChange,
  onSearch,
  placeholder = "search...",
  renderIcon,
}) => {
  const [displayInput, setDisplayInput] = useState(false);

  return (
    <div className={`searchBarContainer ${className}`}>
      <div
        className="searchBar"
        style={{
          flexDirection: iconSide === "right" ? "row" : "row-reverse",
        }}
      >
        <div>
          <input
            className={`searchInput ${inputClassName} ${
              displayInput ? "" : "searchInputHidden"
            }`}
            onChange={(e) => {
              if (onChange) {
                const text = e.currentTarget.value;
                onChange(text);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (onSearch) {
                  const text = e.currentTarget.value;
                  onSearch(text);
                }
              }
            }}
            placeholder={placeholder}
          />
        </div>
        <div
          onClick={() => {
            setDisplayInput(!displayInput);
          }}
        >
          {renderIcon ? renderIcon() : <span className="searchIcon">🔍</span>}
        </div>
      </div>
    </div>
  );
};

export default AimoSearchBar;
