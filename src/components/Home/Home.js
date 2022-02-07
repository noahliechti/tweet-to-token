import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { HashLink } from "react-router-hash-link";
import { Typography, Button, Grid, Container } from "@mui/material";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CustomerCard from "../CustomerCard/CustomerCard";
import Steps from "../Steps/Steps";
import About from "../About/About";
import FAQ from "../Faq/FAQ";
import ClosableAlert from "../ClosableAlert/ClosableAlert";
import Milestones from "../Milestones/Milestones";

import { cardsContent, BASE_URL, FUNCTIONS_PREFIX } from "../../config/globals";
import { injected } from "../../config/connectors";

import tweetToken from "../../config/contracts/TweetToken.json";
import addressMap from "../../config/contracts/map.json";

function Home() {
  const { active, activate, chainId, library, error } = useWeb3React();

  const [contract, setContract] = useState();
  const [twitterUser, setTwitterUser] = useState();
  const [signer, setSigner] = useState();
  const [deployer, setDeployer] = useState();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      const connectedToMM = window.localStorage.getItem("ConnectedToMM");
      if (isAuthorized && !active && !error && connectedToMM) {
        activate(injected);
        window.localStorage.setItem("ConnectedToMM", true);
      } else if (!isAuthorized) {
        window.localStorage.removeItem("ConnectedToMM");
      }
      if (error instanceof UnsupportedChainIdError) {
        // TODO: change network
        // console.log(error.message);
      }
    });
  }, [activate, active, error]);

  useEffect(() => {
    const saveSigners = async () => {
      if (library) {
        setSigner(await library.getSigner());
        setDeployer(
          new ethers.Wallet(process.env.REACT_APP_DEPLOYER_PRIVATE_KEY, library)
        );
      }
    };
    saveSigners();
  }, [library]);

  useEffect(() => {
    // const saleState = async () => {
    // console.log("contract is active", await contract.saleIsActive());
    // };
    if (chainId) {
      if (addressMap[chainId]) {
        const tweetTokenAddress = addressMap[chainId].TweetToken;
        if (signer) {
          const TweetToken = new ethers.Contract(
            tweetTokenAddress,
            tweetToken.abi,
            signer
          );
          // saleState(TweetToken);
          setContract(TweetToken);
        }
      } else {
        // console.err("Smart contract doesn't seem to deployed on this network");
        // TODO: notification? or disable button?
      }
    }
  }, [chainId, signer]);

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
        const { user } = response;
        setTwitterUser(user || null);
      })
      .catch(() => {
        // console.error(err); // TODO: what do I show then?
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <ClosableAlert message="This is an error alert — check it out!" />
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
          <Steps
            userId={twitterUser ? twitterUser.userId : null}
            contract={contract}
            signer={signer}
            deployer={deployer}
          />
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
