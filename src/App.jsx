import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker";
import EventsList from "./components/EventsList";
import { fetchEvents } from "./utils/api";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = async (startDate, endDate) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchEvents({ startDate, endDate });
      console.log("API response:", result);

      setEvents(result.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Event Management System
      </Typography>

      <Box mb={4}>
        <DateRangePicker onDateChange={handleDateChange} />
      </Box>

      <EventsList events={events} loading={loading} error={error} />
    </Container>
  );
}

export default App;
