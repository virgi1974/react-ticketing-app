import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{
          mt: 3,           // increased top margin
          maxWidth: 600,
          mx: "auto",
          fontSize: '1.4rem',
          lineHeight: 1.4
        }}
      >
        Find and browse upcoming events.
        <br />
        Select a date range to get started.
      </Typography>
    </Box>
  );
};

export default Header;
