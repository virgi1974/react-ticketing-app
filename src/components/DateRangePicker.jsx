import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // CSS for styling
import "./DateRangePicker.css";

const DateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="date-picker-container">
      <div className="date-picker-field">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            onDateChange && onDateChange(date, endDate);
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
          className="date-input"
        />
      </div>

      <div className="date-picker-field">
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            onDateChange && onDateChange(startDate, date);
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          className="date-input"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
