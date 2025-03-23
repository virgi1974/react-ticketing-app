import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import EventCard from "./EventCard";

const EventsList = ({ events, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Box my={4}>
        <Typography>No events found for the selected dates.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        mt: 2,
        gridTemplateColumns: {
          xs: "1fr", // 1 column on mobile
          sm: "repeat(2, 1fr)", // 2 columns on tablet
          md: "repeat(3, 1fr)", // 3 columns on desktop
        },
      }}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
};

export default EventsList;
