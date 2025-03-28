import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // CSS for styling
import "./DateRangePicker.css";
import { DateRangePickerProps } from "../types/events";

const DateRangePicker = ({ onDateChange }: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Handle search button click
  const handleSearch = () => {
    // Only trigger search if both dates are selected
    if (startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  return (
    <div className="date-picker-container">
      <div className="date-picker-field">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
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
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || undefined}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          className="date-input"
        />
      </div>

      <button
        className="search-button"
        onClick={handleSearch}
        disabled={!startDate || !endDate}
      >
        Search Events
      </button>
    </div>
  );
};

export default DateRangePicker;
