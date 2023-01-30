/*
 * Created on Wed Nov 23 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { useEffect, useRef, useState } from "react";
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
  passwordTogglerRenderFunc,
  placeholder,
  showPasswordDisplayIcon = true,
  value,
  ...extra
}) => {
  const [isFocused, setIsFocued] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const inputVisible = (value && value.length > 0) || isFocused ? true : false;
  const [firstValue, setFirstValue] = useState(true);
  const [inputValue, setInputValue] = useState(value);

  const inputRef = useRef(null);

  const setInputFocus = () => {
    window.setTimeout(() => inputRef.current.focus(), 0);
    setIsFocued(true);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const renderInput = (type) => {
    const InputComponent = inputType === "textarea" ? "textarea" : "input";
    return (
      <div className={!inputVisible ? "titledInputTextContainer" : ""}>
        <InputComponent
          autoFocus={true}
          className={`titledInputText ${inputClassName}`}
          onBlur={() => setIsFocued(false)}
          onChange={(e) => {
            const value = e.target.value;
            onChange(value);
            if (firstValue && value.length > 0) {
              setFirstValue(false);
              setInputValue("");
            } else {
              setInputValue(value);
            }
          }}
          onFocus={() => setIsFocued(true)}
          ref={inputRef}
          type={type}
          value={inputValue}
          {...extra}
        />
      </div>
    );
  };

  const type =
    inputType === "password" && !isPasswordHidden ? "text" : inputType;

  return (
    <div
      className={`titledInputContainer ${
        inputVisible ? "titledInputContainerFocused" : ""
      } ${inputVisible ? activeStateClassName : inactiveStateClassName}
      ${inputType !== "textarea" ? "normalInputContainer" : ""}`}
      onClick={!inputVisible ? setInputFocus : null}
    >
      <div className="titledInputGroupContainer">
        <div
          className={`titledInputPlaceholder ${
            inputVisible ? "titledInputPlaceholderFocused" : ""
          } ${
            inputVisible
              ? activeStatePlaceholderClassName
              : inactiveStatePlaceholderClassName
          }`}
        >
          {placeholder}
        </div>
        {renderInput(type)}
      </div>
      {inputType === "password" && showPasswordDisplayIcon && (
        <div
          className="inputPasswordEye"
          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
        >
          {passwordTogglerRenderFunc ? (
            passwordTogglerRenderFunc(isPasswordHidden)
          ) : isPasswordHidden ? (
            <span>🔒</span>
          ) : (
            <span>🔓</span>
          )}
        </div>
      )}
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
  passwordTogglerRenderFunc: PropTypes.func,
  placeholder: PropTypes.string,
  showPasswordDisplayIcon: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default AimoTitledInput;
