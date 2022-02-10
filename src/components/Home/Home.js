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
import Alerts from "../Alerts/Alerts";
import Milestones from "../Milestones/Milestones";

import {
  cardsContent,
  BASE_URL,
  FUNCTIONS_PREFIX,
  ALERT_CODES,
} from "../../config/globals";
import { injected } from "../../config/connectors";

import tweetToken from "../../config/contracts/TweetToken.json";
import addressMap from "../../config/contracts/map.json";

import Snacks from "../Snacks/Snacks";

function Home() {
  const { active, activate, chainId, library, error } = useWeb3React();

  const [contract, setContract] = useState();
  const [twitterUser, setTwitterUser] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [signer, setSigner] = useState();
  const [deployer, setDeployer] = useState();
  const [persistentChainId, setPersistentChainId] = useState();
  const [snackPack, setSnackPack] = React.useState([]);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      const connectedToMM = window.localStorage.getItem("ConnectedToMM");

      if (!(window.ethereum && window.ethereum.isMetaMask)) {
        setAlertMessage(ALERT_CODES.NOMM);
      } else {
        if (isAuthorized && !active && !error && connectedToMM) {
          activate(injected);
          window.localStorage.setItem("ConnectedToMM", true);
        } else if (!isAuthorized) {
          window.localStorage.removeItem("ConnectedToMM");
        }

        if (error instanceof UnsupportedChainIdError) {
          setAlertMessage(ALERT_CODES.UNSUP);
        }
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
    if (chainId) {
      if (addressMap[chainId]) {
        const tweetTokenAddress = addressMap[chainId].TweetToken;
        if (signer) {
          const TweetToken = new ethers.Contract(
            tweetTokenAddress,
            tweetToken.abi,
            signer
          );
          setContract(TweetToken);
        }
      } else {
        // console.error("smart contract is not deployed on this network");
        setAlertMessage(ALERT_CODES.NOTDEP);
        setPersistentChainId(chainId);
        setContract(null);
      }
    }
  }, [alertMessage, chainId, signer]);

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
        // console.log("catch");
        // console.error(err); // TODO: what do I show then? alert?
      });
  }, []);

  return (
    <Container maxWidth="xl">
      {alertMessage && (
        <Alerts
          activeAlert={alertMessage}
          setAlertMessage={setAlertMessage}
          persistentChainId={persistentChainId}
        />
      )}
      <Snacks snackPack={snackPack} setSnackPack={setSnackPack} />
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
            setAlertMessage={setAlertMessage}
            setSnackPack={setSnackPack}
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
