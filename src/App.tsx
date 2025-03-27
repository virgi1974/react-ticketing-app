import { useState } from "react";
import { Container, Typography, Pagination } from "@mui/material";
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
  const [perPage, _setPerPage] = useState(9);

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

  const fixedWidth = "1152px"; // Define a consistent width value

  return (
    <>
      <Navbar />
      <section style={{ textAlign: "center", padding: "2rem 0" }}>
        <Typography
          variant="h5"
          sx={{
            whiteSpace: "nowrap",
            maxWidth: "800px",
            margin: "0 auto",
            color: "primary.main", // matches your MUI primary color
            // alternatively: color: '#1976d2', // MUI's default primary blue
            fontWeight: 500,
          }}
        >
          Find and browse upcoming events. Select a date range to get started.
        </Typography>
      </section>
      <Container maxWidth="lg" sx={{ pb: 2 }}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Event Management System
        </Typography> */}

        {/* Fixed width wrapper with !important flag */}
        <div
          style={{
            width: fixedWidth,
            maxWidth: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* DateRangePicker with fixed width container */}
          <div
            style={{
              width: fixedWidth,
              maxWidth: "100%",
              marginBottom: "32px",
              boxSizing: "border-box",
              overflow: "hidden", // Prevent expansion
            }}
          >
            <DateRangePicker onDateChange={handleDateChange} />
          </div>

          {/* Optionally, results count */}
          {!loading && !error && events.length > 0 && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              Found {events.length} events
            </Typography>
          )}

          {/* EventsList with matching fixed width */}
          <div
            style={{
              width: fixedWidth,
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <EventsList events={events} loading={loading} error={error} />
          </div>

          {/* Pagination */}
          {!loading && !error && events.length > 0 && (
            <div
              style={{
                width: fixedWidth,
                maxWidth: "100%",
                marginTop: "32px",
                display: "flex",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_e, page) => handlePageChange(page)}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
