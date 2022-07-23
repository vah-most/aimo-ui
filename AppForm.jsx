/*
 * Created on Wed Jul 20 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import AppTitledInput from "./AppTitledInput";
import AppButton from "./AppButton";

import "./AppForm.scss";

const AppForm = ({
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
            <AppTitledInput
              className="formInput"
              inputType="input"
              labelClassName={`formInputLabel ${inputLabelClassName}`}
              onChange={(value) => {
                onChange && onChange(item.name, value);
              }}
              placeholder={item.title}
              type={item.type}
              value={values[item.name]}
            />
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
