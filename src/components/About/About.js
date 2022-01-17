import { Grid, Typography, Box } from "@mui/material";

import { ReactComponent as AskGraphic } from "../../assets/graphics/company.svg";

function About() {
  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <AskGraphic />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography>
            <em>tweettoken.io</em> is a platform built on Ethereum. It let's you
            mint your Tweets with a few clicks <strong>for free</strong>. We
            offer
            <strong> customization options</strong> for the theme and the
            language of the tweet.
          </Typography>
          <br />
          <Typography>
            NFT Tweets can be sold for <strong>millions of dollars</strong> and
            we think everybody should be able to participate in this market.
          </Typography>
          <Typography>
            <em>tweettoken.io</em> provides the easiest and fastest way to mint
            <strong> metadata-rich</strong> Tweet NFTs!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
export default About;
