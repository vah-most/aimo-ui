/*
 * Created on Wed Jul 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import searchIcon from "./AimoSearchBarIcon.svg";
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
        <div
          className={`searchInputContainer ${
            displayInput ? "" : "searchInputContainerHidden"
          }`}
        >
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
          className="searchIconContainer"
          onClick={() => {
            setDisplayInput(!displayInput);
          }}
        >
          {renderIcon ? (
            renderIcon()
          ) : (
            <img className="searchIcon" src={searchIcon} alt="?" />
          )}
        </div>
      </div>
    </div>
  );
};

AimoSearchBar.propTypes = {
  className: PropTypes.string,
  iconSide: PropTypes.oneOf(["left", "right"]),
  inputClassName: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  renderIcon: PropTypes.func,
};

export default AimoSearchBar;
