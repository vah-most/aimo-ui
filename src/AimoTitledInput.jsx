/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppDatePicker from "./AppDatePicker";
import AppTagCollection from "./AppTagCollection";

import "./AppTitledInput.scss";

const AppTitledInput = ({
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
          <AppDatePicker
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
          <AppTagCollection
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

export default AppTitledInput;
