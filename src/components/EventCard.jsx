import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": { transform: expanded ? "none" : "translateY(-4px)" },
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

              <Button onClick={handleExpandClick} size="small" sx={{ mt: 1 }}>
                {expanded ? "Hide Details" : "View Details"}
              </Button>
            </Box>
          )}
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, pt: 0 }}>
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
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        Zones:
                      </Typography>
                      {slot.zones.map((zone) => (
                        <Box key={zone.id} sx={{ ml: 1, mt: 0.5 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {zone.name}
                          </Typography>
                          <Box sx={{ ml: 1 }}>
                            <Typography variant="body2">
                              Price: {zone.price}€
                            </Typography>
                            <Typography variant="body2">
                              Capacity: {zone.capacity}
                            </Typography>
                            <Typography variant="body2">
                              {zone.numbered
                                ? "Numbered seating"
                                : "General admission"}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>
      </Collapse>
    </Card>
  );
};

export default EventCard;
