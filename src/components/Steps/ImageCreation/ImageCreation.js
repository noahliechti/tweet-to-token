import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { ReactComponent as ExpandIcon } from "../../../assets/icons/expand.svg";

function ImageCreation() {
  return (
    <>
      <Typography>
        Copy the link of the Tweet you want to mint and paste it into the input
        field.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <Typography>Where can I find the link?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Finding the link to a Tweet you want to share isn't obvious, but
              it's also not difficult. Here is an easy method.
            </Typography>
            <ol>
              <li>Navigate to the Tweet</li>
              <li>Open the Share Menu</li>
              <li>Click the "Copy link to Tweet" Option</li>
            </ol>
            <Typography>
              Check if your link has the following format:
            </Typography>
            <Box sx={{ width: 1, wordWrap: "break-word" }}>
              <code>
                https://twitter.com/YourUsername/status/SomeRandomBigNumber
              </code>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default ImageCreation;
