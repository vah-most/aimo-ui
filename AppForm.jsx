/*
 * Created on Wed Jul 20 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppButton from "./AppButton";

import "./AppForm.scss";

const AppForm = ({
  errors = {},
  inputLabelClassName,
  inputs,
  onChange,
  onSubmit,
  values,
}) => {
  return (
    <div className="formContainer">
      {inputs.map((item) => {
        return (
          <div key={item.name} className="formRow">
            <span className="formRowLabel">{item.title}</span>
            <input
              className="formInput"
              onChange={({ currentTarget }) => {
                onChange && onChange(item.name, currentTarget.value);
              }}
              placeholder={item.title}
              type={item.type}
              value={values[item.name]}
            />
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
