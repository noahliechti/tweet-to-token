import { Typography, Box, TextField } from "@mui/material";

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
        <code>https://twitter.com/yourUsername/status/aBigNumber</code>
      </Box>
    </>
  ),
};

function ImageCreation({ state, formIsSubmitting, handleChange }) {
  return (
    <>
      <Typography component="div" variant="body">
        Paste the link of your Tweet into the input field. This process can take
        a while. <b>Don't reload</b> the page.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <FaqElement {...faq} />
      </Box>
      <TextField
        label="Tweet URL"
        fullWidth
        name="tweetURL"
        value={state.tweetURL}
        disabled={formIsSubmitting}
        onChange={(e) => handleChange(e.target)}
        error={!!state.invalidTweetURLMessage}
        helperText={state.invalidTweetURLMessage}
        sx={{ mt: 2 }}
      />
    </>
  );
}

export default ImageCreation;
