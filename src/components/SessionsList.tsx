import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SoldOutIcon from "@mui/icons-material/MoneyOff";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { formatDisplayDate } from "../utils/dateUtils";
import ZonesList from "./ZonesList";
import { Session, SessionsListProps } from "../types/events";

const SessionsList = ({ slots }: SessionsListProps) => {
  return (
    <>
      {slots?.map((slot: Session, index: number) => (
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
                  <ConfirmationNumberIcon fontSize="small" color="success" />
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
              <ZonesList zones={slot.zones} />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default SessionsList;
