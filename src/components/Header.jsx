import { Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "50%",
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          height: 80,
        }}
      >
        <EventIcon sx={{ fontSize: 40, color: "white" }} />
      </Box>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 700, color: "primary.dark" }}
      >
        Event Explorer
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 600, mx: "auto" }}
      >
        Find and browse upcoming events with our powerful event management
        system. Select a date range to get started.
      </Typography>
    </Box>
  );
};

export default Header;
