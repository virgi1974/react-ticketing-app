import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { alpha } from "@mui/material/styles";
import SessionsList from "./SessionsList";
import { getCategoryImage, getCategoryColor } from "../utils/categoryUtils";
import { formatDisplayDate } from "../utils/dateUtils";
import { EventCardProps } from "../types/events";

const EventCard = ({ event }: EventCardProps) => {
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
        sx={{ "& .MuiDialog-paper": { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="500">
            Next Sessions
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <SessionsList slots={event.slots} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;
