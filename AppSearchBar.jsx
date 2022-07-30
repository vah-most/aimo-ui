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

import AppIcon from "./AppIcon";
import AppTooltip from "./AppTooltip";

import "./AppSearchBar.scss";

const AppSearchBar = () => {
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
        <AppIcon
          name="search"
          className="hand searchIcon"
          id="menu_search"
          onClick={() => {
            setDisplayInput(!displayInput);
          }}
        />
        <AppTooltip target="menu_search">Search tasks</AppTooltip>
      </div>
    </div>
  );
};

export default AppSearchBar;
