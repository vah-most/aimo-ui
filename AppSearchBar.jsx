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

import "./AppSearchBar.scss";

const AppSearchBar = () => {
  const dispatch = useDispatch();
  const [displayInput, setDisplayInput] = useState(false);

  return (
    <div className="searchBarContainer">
      <div
        className="searchBar"
        style={{
          width: `${30 + (displayInput ? 200 : 0)}px`,
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
          onClick={() => {
            setDisplayInput(!displayInput);
          }}
        />
      </div>
    </div>
  );
};

export default AppSearchBar;
