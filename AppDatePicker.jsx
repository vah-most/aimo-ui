/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import DatePicker from "react-date-picker";

import AppIcon from "./AppIcon";

import "react-date-picker/dist/DatePicker.css";
import "./AppDatePicker.scss";

const AppDatePicker = ({ value, className, onChange }) => {
  return (
    <DatePicker
      calendarClassName="datePickerCalendar"
      calendarIcon={<AppIcon name="calendar" style={{ fontSize: "16px" }} />}
      className={`datePicker ${className}`}
      onChange={onChange}
      value={value ? new Date(value) : null}
    />
  );
};

export default AppDatePicker;
