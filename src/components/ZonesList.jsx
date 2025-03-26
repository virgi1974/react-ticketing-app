import { Box, Typography, Paper, Stack, Chip } from "@mui/material";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EuroIcon from "@mui/icons-material/Euro";
import GroupIcon from "@mui/icons-material/Group";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const ZonesList = ({ zones }) => {
  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LocalActivityIcon fontSize="small" color="primary" />
        Zones
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {zones.map((zone) => (
          <Paper
            key={zone.id}
            elevation={0}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: 2,
                borderColor: "primary.main",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              {zone.name}
            </Typography>

            <Stack spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <EuroIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  Price
                </Typography>
                <Chip
                  label={`${zone.price}€`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <GroupIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  Capacity
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {zone.capacity}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  <EventSeatIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  Seating
                </Typography>
                <Chip
                  label={zone.numbered ? "Numbered" : "General"}
                  size="small"
                  color={zone.numbered ? "info" : "default"}
                  variant="outlined"
                />
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ZonesList;
