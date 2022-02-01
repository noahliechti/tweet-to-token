import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

import { ReactComponent as ExpandIcon } from "../../assets/icons/expand.svg";

function FAQ() {
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandIcon />}
        // aria-controls="panel2a-content"
        // id="panel2a-header"
      >
        <Typography>Why do I have to sign in with Twitter?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          By signing in with Twitter we can ensure, that users only can mint
          their own tweets.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default FAQ;
