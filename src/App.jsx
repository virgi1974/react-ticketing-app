import "./App.css";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  const handleDateChange = (startDate, endDate) => {
    // Handle date changes
    console.log("Dates changed:", startDate, endDate);
  };

  return (
    <>
      <h1>Ticketing System API</h1>
      <DateRangePicker onDateChange={handleDateChange} />
    </>
  );
}

export default App;
