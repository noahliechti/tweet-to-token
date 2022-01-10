import Footer from "../footer/Footer";
import Header from "../header/Header";
import CustomerCard from "../customerCard/CustomerCard";
import Steps from "../steps/Steps";
import About from "../about/About";
import FAQ from "../faq/FAQ";
import Team from "../team/Team";
import Milestones from "../milestones/Milestones";

import { HashLink } from "react-router-hash-link";

import { Typography, Button, Grid, Container } from "@mui/material";

function Home() {
  return (
    <Container>
      <Header />
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
            variant="contained"
            color="primary"
            component={HashLink}
            to="#steps"
            smooth
            sx={{ width: 1, height: 40 }}
          >
            Let's go!
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">Who is this for?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body">
            We have all types of people who mint their tweets, from celebrities
            to people who just posted a tweet the first time.
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
        <Grid id="steps" item xs={12}>
          <Typography variant="h2">How does it work?</Typography>
          <Steps></Steps>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">About TTT</Typography>
          <About></About>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">FAQ</Typography>
          <FAQ></FAQ>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">Milestones</Typography>
          <Milestones></Milestones>
        </Grid>
        {/* <Grid item xs={12}>
            <Typography variant="h2">Team</Typography>
            <Team></Team>
          </Grid> */}
      </Grid>
      <Footer />
    </Container>
  );
}

export default Home;
