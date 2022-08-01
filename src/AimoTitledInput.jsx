/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AimoDatePicker from "./AimoDatePicker";
import AimoTagCollection from "./AimoTagCollection";

import "./AimoTitledInput.scss";

const AimoTitledInput = ({
  alwaysShowLabel = false,
  className,
  error = null,
  extraProps = null,
  inputType,
  labelClassName,
  onChange,
  placeholder,
  style,
  value = "",
  ...extra
}) => {
  const getInputComponent = () => {
    switch (inputType) {
      case "textarea":
        return (
          <textarea
            className="titledInput"
            onChange={(e) => {
              if (!e.currentTarget) return;
              const { value } = e.currentTarget;
              onChange && onChange(value);
            }}
            placeholder={alwaysShowLabel ? null : placeholder}
            style={style}
            value={value}
            {...extra}
          />
        );

      case "date":
        return (
          <AimoDatePicker
            className="titledInput"
            onChange={(value) => {
              onChange && onChange(value);
            }}
            placeholder={placeholder}
            style={style}
            value={value}
            {...extra}
          />
        );

      case "tag":
        return (
          <AimoTagCollection
            className="titledInput"
            collection={
              extraProps && typeof extraProps.collection === "function"
                ? extraProps.collection()
                : value
            }
            onChange={(value) => {
              onChange && onChange(value);
            }}
            style={style}
            tags={value}
            {...extra}
          />
        );

      case "input":
      default:
        return (
          <input
            className="titledInput"
            onChange={(e) => {
              if (!e.currentTarget) return;
              const { value } = e.currentTarget;
              onChange && onChange(value);
            }}
            placeholder={alwaysShowLabel ? null : placeholder}
            style={style}
            value={value}
            {...extra}
          />
        );
    }
  };
  return (
    <div className={`titledInputParentContainer ${className}`}>
      <span
        className={`titledInputLabel ${labelClassName}`}
        style={{
          display: value || alwaysShowLabel ? "unset" : "none",
        }}
      >
        {placeholder}
      </span>
      <div className="titledInputContainer">
        {getInputComponent()}
        {error && <span className="titledInputError">{error}</span>}
      </div>
    </div>
  );
};

export default AimoTitledInput;
