import { Typography, Box } from "@mui/material";

import FaqElement from "../../Faq/FaqElement/FaqElement";

const faq = {
  summary: "Where can I find the link?",
  detail: (
    <>
      <Typography>
        Finding the link to a Tweet you want to share isn't obvious, but it's
        also not difficult. Here is an easy method.
      </Typography>
      <ol>
        <li>Navigate to the Tweet</li>
        <li>Open the Share Menu</li>
        <li>Click the "Copy link to Tweet" Option</li>
      </ol>
      <Typography>Check if your link has the following format:</Typography>
      <Box sx={{ width: 1, wordWrap: "break-word" }}>
        <code>https://twitter.com/YourUsername/status/SomeLargeNumber</code>
      </Box>
    </>
  ),
};

function ImageCreation() {
  return (
    <>
      <Typography component="div" variant="body">
        Copy the link of the Tweet you want to mint and paste it into the input
        field.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <FaqElement {...faq} />
      </Box>
    </>
  );
}

export default ImageCreation;
