import React, { useState, useEffect } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CustomerCard from "../CustomerCard/CustomerCard";
import Steps from "../Steps/Steps";
import About from "../About/About";
import FAQ from "../Faq/FAQ";
import Milestones from "../Milestones/Milestones";
import { cardsContent } from "../../config/globals";

import { HashLink } from "react-router-hash-link";

import { Typography, Button, Grid, Container } from "@mui/material";

function Home() {
  const [state, setState] = useState({
    twitterUser: null,
  });

  useEffect(() => {
    fetch("http://localhost:5000/.netlify/functions/auth", {
      method: "GET",
      credentials: "include", // Fetch does not send cookies. So we need this line
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((responseJson) => {
        const { user } = responseJson;
        setState({
          twitterUser: user ? user : null,
        });
      });
  }, []);

  return (
    <Container maxWidth="xl">
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
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            We have all types of people who mint their tweets, from celebrities
            to people who just posted a tweet the first time.
          </Typography>
        </Grid>
        {cardsContent.map((content) => (
          <Grid key={content.title} item xs={12}>
            <CustomerCard content={content}></CustomerCard>
          </Grid>
        ))}
        <Grid id="steps" item xs={12}>
          <Typography variant="h2">How does it work?</Typography>
          <Steps twitterUser={state.twitterUser}></Steps>
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
      </Grid>
      <Footer />
    </Container>
  );
}

export default Home;
