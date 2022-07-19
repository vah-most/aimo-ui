/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import Datetime from "react-datetime";

import "react-datetime/css/react-datetime.css";
import "./AppDatePicker.scss";

const AppDatePicker = ({ value, className, onChange }) => {
  return (
    <Datetime
      className="datePicker"
      closeOnSelect={true}
      closeOnClickOutside={true}
      inputProps={{
        placeholder: "Deadline",
        className: { className },
      }}
      onChange={(selectedDate) => {
        if (selectedDate) selectedDate = selectedDate.format("YYYY-MM-DD");
        onChange && onChange(selectedDate);
      }}
      renderInput={(props, openCalendar, closeCalendar) => {
        function clear() {
          props.onChange({ target: { value: "" } });
        }
        return <input {...props} className="titledInput" />;
      }}
      timeFormat={false}
      value={value ? new Date(value).getTime() : null}
    />
  );
};

export default AppDatePicker;
