/*
 * Created on Mon Jul 04 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import DatePicker from "react-date-picker";

import AimoIcon from "./AimoIcon";

import "react-date-picker/dist/DatePicker.css";
import "./AimoDatePicker.scss";

const AimoDatePicker = ({ value, className, onChange }) => {
  return (
    <DatePicker
      calendarClassName="datePickerCalendar"
      calendarIcon={
        <AimoIcon
          className="datePickerIcon datePickerCalendarIcon"
          name="calendar"
        />
      }
      className={`datePicker ${className}`}
      onChange={onChange}
      value={value ? new Date(value) : null}
    />
  );
};

export default AimoDatePicker;
