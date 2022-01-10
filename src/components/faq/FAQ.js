import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

import { ReactComponent as ExpandIcon } from "../../assets/icons/expand.svg";

function FAQ() {
  return (
    <>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          // aria-controls="panel2a-content"
          // id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default FAQ;
