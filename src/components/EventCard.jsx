import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const EventCard = ({ event }) => {
  // Format the date for display
  const formatDisplayDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <CardHeader
        title={event.title}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Box component="span" fontWeight="fontWeightMedium">
            Date:
          </Box>{" "}
          {formatDisplayDate(event.starts_at)}
        </Typography>

        {event.ends_at && event.ends_at !== event.starts_at && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <Box component="span" fontWeight="fontWeightMedium">
              Ends:
            </Box>{" "}
            {formatDisplayDate(event.ends_at)}
          </Typography>
        )}

        {event.description && (
          <Typography variant="body2" color="text.primary" sx={{ mt: 1.5 }}>
            {event.description}
          </Typography>
        )}

        {event.location && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            <Box component="span" fontWeight="fontWeightMedium">
              Location:
            </Box>{" "}
            {event.location}
          </Typography>
        )}

        {event.category && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label={event.category}
              size="small"
              sx={{
                backgroundColor: "primary.light",
                color: "primary.dark",
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
