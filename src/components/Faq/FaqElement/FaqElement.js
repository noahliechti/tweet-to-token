import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

import { ReactComponent as ExpandIcon } from "../../../assets/icons/expand.svg";

function FaqElement({ summary, detail }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography>{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{detail}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default FaqElement;
