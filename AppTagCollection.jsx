/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { useState } from "react";
import Select, { components } from "react-select";

import AppIcon from "./AppIcon";
import AppTextBubble from "./AppTextBubble";

import "./AppTagCollection.scss";

const AppTagCollection = ({ className, collection, onChange, style, tags }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTagDelete = (value) => {
    if (!tags.includes(value)) return;

    let newTags = [...tags];
    newTags = newTags.filter((tag) => tag !== value);
    onChange && onChange(newTags);
  };

  const handleTagAdd = (value) => {
    if (tags.includes(value)) return;

    let newTags = [...tags];
    newTags.push(value);
    onChange && onChange(newTags);
  };

  const displayAddIcon = () => {
    return (
      <AppIcon
        name="plus"
        className="hand tagAddIcon"
        onClick={() => handleTagAdd(tagInput)}
      />
    );
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {displayAddIcon()}
      </components.DropdownIndicator>
    );
  };

  return (
    <div className={`tagCollectionContainer ${className}`} style={style}>
      <Select
        components={{ DropdownIndicator }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTagAdd(tagInput);
          }
        }}
        options={
          collection
            ? collection.map((tag) => {
                return { label: tag, value: tag };
              })
            : []
        }
        onInputChange={(input) => {
          if (input) {
            setTagInput(input);
          }
        }}
        placeholder="Add ..."
      />
      <div className="tagsContainer">
        {tags &&
          tags.map((tag, index) => {
            return (
              <AppTextBubble
                key={index}
                className="tagItem"
                onDelete={handleTagDelete}
                text={tag}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AppTagCollection;
