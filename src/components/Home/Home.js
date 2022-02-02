import React, { useState, useEffect } from "react";

import { HashLink } from "react-router-hash-link";
import { Typography, Button, Grid, Container } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CustomerCard from "../CustomerCard/CustomerCard";
import Steps from "../Steps/Steps";
import About from "../About/About";
import FAQ from "../Faq/FAQ";
import Milestones from "../Milestones/Milestones";

import { cardsContent, BASE_URL, FUNCTIONS_PREFIX } from "../../config/globals";
import { injected } from "../../config/connectors";
import addressMap from "../../config/contracts/map.json";

function Home() {
  const { active, activate, chainId, library, connector } = useWeb3React();

  const [state, setState] = useState({
    twitterUser: null,
  });

  if (connector && !chainId) {
    // console.log("Network not supported");
    // TODO: change network
  }

  if (library) {
    library.getSigner();
  }

  useEffect(() => {
    if (active) {
      window.localStorage.setItem("ConnectedMM", active);
    }
  }, [active]);

  useEffect(() => {
    const activateMetaMask = async () => {
      try {
        await activate(injected);
      } catch (err) {
        // console.log(err); // TODO:
      }
    };
    if (window.localStorage.getItem("ConnectedMM") === "true") {
      activateMetaMask();
    }
  }, [activate]);

  useEffect(() => {
    if (chainId) {
      if (addressMap[chainId]) {
        // const contractAddress = addressMap[chainId].TweetToken;
        // console.log("Deployed contract", contractAddress);
        // TODO: connect to contract
      } else {
        // console.log("Smart contract doesn't seem to deployed on this network"); // TODO: notification?
      }
    }
  }, [chainId]);

  useEffect(() => {
    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/auth`, {
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
        throw new Error("Getting the twitter login status fails!"); // TODO:
      })
      .then((response) => {
        // console.log(response.json());
        const { user } = response;
        setState({
          twitterUser: user || null,
        });
      })
      .catch(() => {
        // console.error(err); // TODO: what do I show then?
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
            <CustomerCard content={content} />
          </Grid>
        ))}
        <Grid id="steps" item xs={12}>
          <Typography variant="h2">How does it work?</Typography>
          <Steps twitterUser={state.twitterUser} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">About TTT</Typography>
          <About />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">FAQ</Typography>
          <FAQ />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">Milestones</Typography>
          <Milestones />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Home;
