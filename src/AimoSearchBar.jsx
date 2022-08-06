/*
 * Created on Wed Jul 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useState } from "react";

import AimoIcon from "./AimoIcon";
import AimoTooltip from "./AimoTooltip";

import "./AimoSearchBar.scss";

const AimoSearchBar = ({ onChange, tooltip }) => {
  const [displayInput, setDisplayInput] = useState(false);

  return (
    <div className="searchBarContainer">
      <div
        className="searchBar"
        style={{
          width: displayInput ? "300px" : "30px",
        }}
      >
        {displayInput && (
          <input
            placeholder="search..."
            className="searchInput"
            onChange={(e) => {
              const text = e.currentTarget.value;
              onChange && onChange(text);
            }}
          />
        )}
        <AimoIcon
          name="search"
          className="hand searchIcon"
          id="menu_search"
          onClick={() => {
            setDisplayInput(!displayInput);
          }}
        />
        <AimoTooltip target="menu_search">{tooltip}</AimoTooltip>
      </div>
    </div>
  );
};

export default AimoSearchBar;
