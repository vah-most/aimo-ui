import Datetime from "react-datetime";

import "./AppDatePicker.scss";

import "react-datetime/css/react-datetime.css";

const AppDatePicker = ({ value, className, onChange }) => {
  return (
    <Datetime
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
