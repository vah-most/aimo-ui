/*
 * Created on Wed Nov 23 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./AimoTitledInput.css";

const AimoTitledInput = ({
  activeStateClassName,
  activeStatePlaceholderClassName,
  inactiveStateClassName,
  inactiveStatePlaceholderClassName,
  inputClassName,
  inputType = "text",
  onChange,
  placeholder,
  showPasswordDisplayIcon = true,
  value,
  ...extra
}) => {
  const [isFocused, setIsFocued] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const inputVisible = (value && value.length > 0) || isFocused ? true : false;

  const inputRef = useRef(null);

  const setInputFocus = () => {
    window.setTimeout(() => inputRef.current.focus(), 0);
    setIsFocued(true);
  };

  const renderInput = () => {
    const InputComponent = inputType === "textarea" ? "textarea" : "input";
    const type =
      inputType === "password" && !isPasswordHidden ? "text" : inputType;
    return (
      <React.Fragment>
        <div className={!inputVisible ? "inputTextContainer" : ""}>
          <InputComponent
            autoFocus={true}
            className={`inputText ${inputClassName}`}
            onBlur={() => setIsFocued(false)}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocued(true)}
            ref={inputRef}
            type={type}
            value={value}
            {...extra}
          />
        </div>
        {inputType === "password" && showPasswordDisplayIcon && (
          <div
            className="passwordEye"
            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            {isPasswordHidden ? <span>🔒</span> : <span>🔓</span>}
          </div>
        )}
      </React.Fragment>
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
      {renderInput()}
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
  showPasswordDisplayIcon: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default AimoTitledInput;
