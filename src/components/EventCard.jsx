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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const getCategoryImage = (category) => {
  // Default image for fallback
  const defaultImage = "/images/default-event.jpg";

  if (!category) {
    return defaultImage;
  }

  // Map of category keywords to images
  const categoryMap = {
    music: "/images/categories/music.jpg",
    sports: "/images/categories/sports.jpg",
    museum: "/images/categories/museum.jpg",
    family: "/images/categories/family.jpg",
  };

  // Try exact match first
  const lowerCategory = category.toLowerCase().trim();
  if (categoryMap[lowerCategory]) {
    return categoryMap[lowerCategory];
  }

  // Try partial match
  for (const [keyword, image] of Object.entries(categoryMap)) {
    if (lowerCategory.includes(keyword)) {
      return image;
    }
  }

  return defaultImage;
};

const EventCard = ({ event }) => {
  // Change expanded state to dialog state
  const [dialogOpen, setDialogOpen] = useState(false);

  // Format the date for display
  const formatDisplayDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Update handler to open dialog instead
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
          transition: "transform 0.2s",
          "&:hover": { transform: "translateY(-4px)" },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={getCategoryImage(event.category)}
          alt={event.category || "Event"}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {event.title || "Untitled Event"}
          </Typography>

          {event.category && (
            <Chip
              label={event.category}
              color="primary"
              size="small"
              sx={{
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

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={event.sell_mode}
              size="small"
              sx={{
                bgcolor: "primary.dark",
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
                px: 1,
              }}
            />
          </Box>

          {event.slots &&
            Array.isArray(event.slots) &&
            event.slots.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <Box component="span" fontWeight="fontWeightMedium">
                    Slots:
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

      {/* Dialog to show event details */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="500">
            {event.title || "Event Details"}
          </Typography>
          {event.category && (
            <Chip
              label={event.category}
              color="primary"
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
                mt: 1,
                px: 1,
              }}
            />
          )}
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {event.slots &&
            Array.isArray(event.slots) &&
            event.slots.map((slot, index) => (
              <Accordion key={slot.id || index} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="medium">
                    {formatDisplayDate(slot.starts_at)}
                  </Typography>
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

                  {slot.sold_out && (
                    <Chip
                      label="SOLD OUT"
                      size="small"
                      color="error"
                      sx={{ mt: 1, mb: 1 }}
                    />
                  )}

                  {slot.zones && slot.zones.length > 0 && (
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                        Zones:
                      </Typography>

                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 2
                      }}>
                        {slot.zones.map((zone) => (
                          <Box
                            key={zone.id}
                            sx={{
                              border: '1px solid #eaeaea',
                              borderRadius: 1,
                              p: 2,
                              backgroundColor: 'background.paper',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                            }}
                          >
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                              {zone.name}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">Price:</Typography>
                              <Typography variant="body2" fontWeight="medium">{zone.price}€</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">Capacity:</Typography>
                              <Typography variant="body2" fontWeight="medium">{zone.capacity}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Seating:</Typography>
                              <Typography variant="body2" fontWeight="medium">
                                {zone.numbered ? "Numbered" : "General admission"}
                              </Typography>
                            </Box>
                          </Box>
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
