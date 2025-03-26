import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { alpha } from "@mui/material/styles";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EuroIcon from "@mui/icons-material/Euro";
import GroupIcon from "@mui/icons-material/Group";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import SoldOutIcon from "@mui/icons-material/MoneyOff";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import { getCategoryImage, getCategoryColor } from "../utils/categoryUtils";
import { formatDisplayDate } from "../utils/dateUtils";

const EventCard = ({ event }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: `0 4px 12px ${alpha(getCategoryColor(event.category), 0.3)}`,
          "&:hover": {
            boxShadow: `0 6px 16px ${alpha(getCategoryColor(event.category), 0.4)}`,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={getCategoryImage(event.category)}
          alt={event.category || "Event"}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {event.title || "Untitled Event"}
          </Typography>

          {event.category && (
            <Chip
              label={event.category}
              size="small"
              sx={{
                bgcolor: getCategoryColor(event.category),
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                mb: 1.5,
                px: 1,
              }}
            />
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            <Box component="span" fontWeight="fontWeightMedium">
              Created:
            </Box>{" "}
            {formatDisplayDate(event.created_at)}
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "success.main",
                boxShadow: "0 0 0 3px rgba(46, 125, 50, 0.2)",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {event.sell_mode}
            </Typography>
          </Box>

          {event.slots &&
            Array.isArray(event.slots) &&
            event.slots.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <Box component="span" fontWeight="fontWeightMedium">
                    Sessions:
                  </Box>{" "}
                  {event.slots.length}
                </Typography>

                <Fab
                  onClick={handleViewDetails}
                  size="small"
                  color="primary"
                  sx={{ mt: 1 }}
                  aria-label="expand"
                >
                  <AddIcon />
                </Fab>
              </Box>
            )}
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="500">
            Next Sessions
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {event.slots &&
            Array.isArray(event.slots) &&
            event.slots.map((slot, index) => (
              <Accordion key={slot.id || index} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    "& .MuiTypography-root": {
                      color: slot.sold_out ? "error.main" : "success.main",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      mr: 2,
                    }}
                  >
                    <Typography fontWeight="medium">
                      {slot.sold_out ? (
                        <SoldOutIcon fontSize="small" color="error" />
                      ) : (
                        <ConfirmationNumberIcon
                          fontSize="small"
                          color="success"
                        />
                      )}
                      {formatDisplayDate(slot.starts_at)}
                    </Typography>
                    {slot.sold_out ? (
                      <Chip label="Sold Out" size="small" color="error" />
                    ) : (
                      <Chip label="Available" size="small" color="success" />
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" gutterBottom>
                    <Box component="span" fontWeight="medium">
                      Ends:
                    </Box>{" "}
                    {formatDisplayDate(slot.ends_at)}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    <Box component="span" fontWeight="medium">
                      Selling period:
                    </Box>{" "}
                    {formatDisplayDate(slot.sell_from)} -{" "}
                    {formatDisplayDate(slot.sell_to)}
                  </Typography>

                  {slot.zones && slot.zones.length > 0 && (
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
                          gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                          },
                          gap: 2,
                        }}
                      >
                        {slot.zones.map((zone) => (
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <EventSeatIcon
                                    sx={{ fontSize: 14, mr: 0.5 }}
                                  />
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
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;
