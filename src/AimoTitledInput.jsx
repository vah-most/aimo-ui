/*
 * Created on Wed Nov 23 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./AimoTitledInput.scss";

const AimoTitledInput = ({
  activeStateClassName,
  activeStatePlaceholderClassName,
  inactiveStateClassName,
  inactiveStatePlaceholderClassName,
  inputClassName,
  inputType = "text",
  onChange,
  placeholder,
  value,
  ...extra
}) => {
  const [isFocused, setIsFocued] = useState(false);
  const inputVisible = (value && value.length > 0) || isFocused ? true : false;

  const inputRef = useRef(null);

  const setInputFocus = () => {
    window.setTimeout(() => inputRef.current.focus(), 0);
    setIsFocued(true);
  };

  const renderInput = () => {
    const InputComponent = inputType === "textarea" ? "textarea" : "input";
    return (
      <InputComponent
        autoFocus={true}
        className={`inputText ${inputClassName}`}
        onBlur={() => setIsFocued(false)}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocued(true)}
        ref={inputRef}
        type={inputType}
        value={value}
        {...extra}
      />
    );
  };

  return (
    <div
      className={`inputContainer ${
        inputVisible ? "inputContainerFocused" : ""
      } ${inputVisible ? activeStateClassName : inactiveStateClassName}`}
      onClick={!inputVisible ? setInputFocus : null}
    >
      <div
        className={`inputPlaceholder ${
          inputVisible ? "inputPlaceholderFocused" : ""
        } ${
          inputVisible
            ? activeStatePlaceholderClassName
            : inactiveStatePlaceholderClassName
        }`}
      >
        {placeholder}
      </div>
      <div className={!inputVisible ? "inputTextContainer" : ""}>
        {renderInput()}
      </div>
    </div>
  );
};

AimoTitledInput.propTypes = {
  activeStateClassName: PropTypes.string,
  activeStatePlaceholderClassName: PropTypes.string,
  inactiveStateClassName: PropTypes.string,
  inactiveStatePlaceholderClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default AimoTitledInput;
