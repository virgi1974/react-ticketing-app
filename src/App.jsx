import { useState } from "react";
import { Container, Typography, Box, Pagination } from "@mui/material";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker";
import EventsList from "./components/EventsList";
import { fetchEvents } from "./utils/api";

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, _setPerPage] = useState(9);

  // Keep track of last search parameters
  const [lastSearchDates, setLastSearchDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // If we have date filters applied, fetch with the new page
    if (lastSearchDates.startDate && lastSearchDates.endDate) {
      fetchEventsData(
        lastSearchDates.startDate,
        lastSearchDates.endDate,
        newPage,
        perPage,
      );
    }
  };

  const fetchEventsData = async (
    startDate,
    endDate,
    page = 1,
    itemsPerPage = perPage,
  ) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching events with params:", {
        startDate,
        endDate,
        page,
        perPage: itemsPerPage,
      });

      const result = await fetchEvents({
        startDate,
        endDate,
        page,
        perPage: itemsPerPage,
      });
      console.log("API response:", result);

      setEvents(result.data || []);

      // Update pagination info from meta data
      if (result.meta && result.meta.pagination) {
        console.log("Pagination data from API:", result.meta.pagination);
        setTotalPages(result.meta.pagination.total_pages || 1);
        setCurrentPage(result.meta.pagination.current_page || 1);
      }

      // Store the search parameters
      setLastSearchDates({ startDate, endDate });
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (startDate, endDate) => {
    // Reset to page 1 when search criteria changes
    setCurrentPage(1);
    fetchEventsData(startDate, endDate, 1, perPage);
  };

  console.log("Pagination state:", {
    currentPage,
    totalPages,
    eventsLength: events.length,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Event Management System
      </Typography>

      <Box mb={4}>
        <DateRangePicker onDateChange={handleDateChange} />
      </Box>

      <EventsList events={events} loading={loading} error={error} />

      {/* Only show pagination when we have events and more than 1 page */}
      {!loading && !error && events.length > 0 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => handlePageChange(page)}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
}

export default App;
