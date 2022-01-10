import Footer from "../footer/Footer";
import Header from "../header/Header";
import CustomerCard from "../customerCard/CustomerCard";
import Steps from "../steps/Steps";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Typography, Button, Grid, Container } from "@mui/material";

function Home() {
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">
              Create NFTs from your Tweets and sell them on Ethereum!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Connect to your wallet, your Twitter and start minting your Tweets
              with one click!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/create"
              variant="contained"
              color="primary"
              sx={{ width: 1 / 1, height: 40 }}
            >
              Let's go!
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={HashLink}
              to="#steps"
              variant="contained"
              color="secondary"
              sx={{ width: 1 / 1, height: 40 }}
            >
              How?
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Who is this for?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body">
              We have all types of people who mint their tweets, from
              celebrities to people who just posted a tweet the first time.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomerCard></CustomerCard>
          </Grid>
          <Grid item xs={12}>
            <CustomerCard></CustomerCard>
          </Grid>
          <Grid item xs={12}>
            <CustomerCard></CustomerCard>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">How does it work?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Steps></Steps>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
