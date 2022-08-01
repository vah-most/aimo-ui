/*
 * Created on Wed Jul 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchTextChange } from "reducers/SearchReducer";

import AimoIcon from "./AimoIcon";
import AimoTooltip from "./AimoTooltip";

import "./AimoSearchBar.scss";

const AimoSearchBar = () => {
  const dispatch = useDispatch();
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
              dispatch(searchTextChange(text));
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
        <AimoTooltip target="menu_search">Search tasks</AimoTooltip>
      </div>
    </div>
  );
};

export default AimoSearchBar;
