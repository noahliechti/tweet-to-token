import { Grid, Typography } from "@mui/material";

import { ReactComponent as AskGraphic } from "../../assets/graphics/company.svg";

function About() {
  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <AskGraphic />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography sx={{ textAlign: "center" }}>
          TokenToTweet is a Platform built on Ethereum. It let's you mint your
          Tweets with a few clicks for free. We got inspired by the tweet of bla
          bla that got sold for 2.5 Mio. USD.
        </Typography>
      </Grid>
    </Grid>
  );
}
export default About;
