import { useState } from "react";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker";
import { fetchEvents } from "./utils/api";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);

      // Call the API function from api.js
      const result = await fetchEvents({ startDate, endDate });

      console.log("API response:", result);
      setEvents(result.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Event Management System</h1>
      <DateRangePicker onDateChange={handleDateChange} />

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}

      {/* We'll add the events list component here later */}
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </div>
  );
}

export default App;
