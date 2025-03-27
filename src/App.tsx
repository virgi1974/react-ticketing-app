import { useState } from "react";
import { Typography, Pagination, Box } from "@mui/material";
import "./App.css";
import DateRangePicker from "./components/DateRangePicker.tsx";
import EventsList from "./components/EventsList.tsx";
import { fetchEvents } from "./utils/api";
import Navbar from "./components/Navbar";
import { Event } from "./types/events";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(10);

  // Keep track of last search parameters
  const [lastSearchDates, setLastSearchDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handlePageChange = (newPage: number) => {
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
    startDate: Date,
    endDate: Date,
    page = 1,
    itemsPerPage = perPage,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchEvents({
        startDate,
        endDate,
        page,
        perPage: itemsPerPage,
      });

      setEvents(result.data || []);

      // Update pagination info from meta data
      if (result.meta && result.meta.pagination) {
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

  const handleDateChange = (startDate: Date, endDate: Date) => {
    // Reset to page 1 when search criteria changes
    setCurrentPage(1);
    fetchEventsData(startDate, endDate, 1, perPage);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography
          variant="h5"
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: 2,
            color: "primary.main",
            fontWeight: 500,
          }}
        >
          Find and browse upcoming events. Select a date range to get started.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          pb: 4,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ mb: 4 }}>
          <DateRangePicker onDateChange={handleDateChange} />
        </Box>

        {/* Results count */}
        {!loading && !error && events.length > 0 && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Found {events.length} events
          </Typography>
        )}

        {/* Events List */}
        <Box sx={{ mb: 4 }}>
          <EventsList events={events} loading={loading} error={error} />
        </Box>

        {/* Pagination */}
        {!loading && !error && events.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_e, page) => handlePageChange(page)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default App;
