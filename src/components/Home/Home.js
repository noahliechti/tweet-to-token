import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Typography, Grid, Container } from "@mui/material";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CustomerCards from "../CustomerCards/CustomerCards";
import Steps from "../Steps/Steps";
import About from "../About/About";
import Faq from "../Faq/Faq";
import Alerts from "../Alerts/Alerts";
import Milestones from "../Milestones/Milestones";
import LandingPage from "../LandingPage/LandingPage";
import Snacks from "../Snacks/Snacks";

import { BASE_URL, FUNCTIONS_PREFIX, ALERT_CODES } from "../../config/globals";

import { injected } from "../../config/connectors";
import tweetToken from "../../config/contracts/TweetToken.json";
import addressMap from "../../config/contracts/map.json";

function Home() {
  const { active, activate, chainId, library, error } = useWeb3React();

  const [contract, setContract] = useState();
  const [twitterUser, setTwitterUser] = useState();
  const [activeAlert, setActiveAlert] = useState();
  const [signer, setSigner] = useState();
  const [deployer, setDeployer] = useState();
  const [persistentChainId, setPersistentChainId] = useState();
  const [snackPack, setSnackPack] = React.useState([]);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      const connectedToMM = window.localStorage.getItem("ConnectedToMM");

      if (!(window.ethereum && window.ethereum.isMetaMask)) {
        setActiveAlert(ALERT_CODES.NOMM);
      } else {
        if (isAuthorized && !active && !error && connectedToMM) {
          activate(injected);
          window.localStorage.setItem("ConnectedToMM", true);
        } else if (!isAuthorized) {
          window.localStorage.removeItem("ConnectedToMM");
        }

        if (error instanceof UnsupportedChainIdError) {
          setActiveAlert(ALERT_CODES.UNSUP);
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
        setActiveAlert(ALERT_CODES.NOTDEP);
        setPersistentChainId(chainId);
        setContract(null);
      }
    }
  }, [activeAlert, chainId, signer]);

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
    <Container maxWidth="lg">
      {activeAlert && (
        <Alerts
          activeAlert={activeAlert}
          persistentChainId={persistentChainId}
          setActiveAlert={setActiveAlert}
        />
      )}
      <Snacks snackPack={snackPack} setSnackPack={setSnackPack} />
      <Header />
      <Grid container rowSpacing={{ xs: 1, sm: 6, md: 10 }}>
        <Grid id="home" item xs={12}>
          <LandingPage />
        </Grid>
        <Grid id="use-case" item xs={12}>
          <Typography variant="h2">Who is this for?</Typography>
          <CustomerCards />
        </Grid>
        <Grid id="steps" item xs={12}>
          <Typography variant="h2">Mint a Tweet</Typography>
          <Steps
            userId={twitterUser ? twitterUser.userId : null}
            contract={contract}
            signer={signer}
            deployer={deployer}
            setActiveAlert={setActiveAlert}
            setSnackPack={setSnackPack}
          />
        </Grid>
        <Grid id="about" item xs={12}>
          <Typography variant="h2">About</Typography>
          <About />
        </Grid>
        <Grid id="faq" item xs={12}>
          <Typography variant="h2">FAQ</Typography>
          <Faq chainId={chainId} />
        </Grid>
        <Grid id="milestones" item xs={12}>
          <Typography variant="h2">Milestones</Typography>
          <Milestones />
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Home;
