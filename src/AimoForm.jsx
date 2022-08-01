/*
 * Created on Wed Jul 20 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { KEY_CODES } from "utils/utils";
import AppButton from "./AppButton";
import AppPasswordInput from "./AppPasswordInput";

import "./AppForm.scss";

const AppForm = ({
  errors = {},
  inputLabelClassName,
  inputs,
  onChange,
  onSubmit,
  values,
}) => {
  const renderInput = (item) => {
    const props = {
      className: "formInput",
      onChange: ({ currentTarget }) => {
        onChange && onChange(item.name, currentTarget.value);
      },
      onKeyDown: (e) => {
        if (e.keyCode === KEY_CODES.KEY_ENTER) {
          onSubmit(values);
        }
      },
      placeholder: item.title,
      type: item.type,
      value: values[item.name],
    };

    switch (item.type) {
      case "password":
        return <AppPasswordInput {...props} />;
      default:
        return <input {...props} />;
    }
  };

  return (
    <div className="formContainer">
      {inputs.map((item) => {
        return (
          <div key={item.name} className="formRow">
            <span className={`formRowLabel ${inputLabelClassName}`}>
              {item.title}
            </span>
            {renderInput(item)}
            <span className="formRowError">
              {item.name in errors ? errors[item.name] : ""}
            </span>
          </div>
        );
      })}
      <AppButton className="submitButton" onClick={onSubmit}>
        Login
      </AppButton>
    </div>
  );
};

export default AppForm;
