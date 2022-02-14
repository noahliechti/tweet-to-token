import { Grid, Box } from "@mui/material";
import FaqElement from "./FaqElement/FaqElement";

import { ReactComponent as QuestionsGraphic } from "../../assets/graphics/question.svg";

const faqs = [
  {
    summary: "Why do I have to sign in with Twitter?",
    detail:
      "By signing in with Twitter we can ensure, that users only can mint their own tweets.",
  },
  {
    summary: "Why can I only mint my tweets?",
    detail: "TODO",
  },
  {
    summary: "What metadata gets stored?",
    detail: "TODO", // TODO: screenshot of metadata
  },
  {
    summary: "Where are the NFTs saved on?",
    detail: "TODO",
  },
  {
    summary: "How much does it cost to mint a Tweet?",
    detail: "TODO",
  },
];

function Faq() {
  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item xs={12} md={6}>
        {faqs.map((e) => (
          <Box key={e.summary} sx={{ mt: 2 }}>
            <FaqElement {...e} />
          </Box>
        ))}
      </Grid>
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <QuestionsGraphic />
      </Grid>
    </Grid>
  );
}
export default Faq;
