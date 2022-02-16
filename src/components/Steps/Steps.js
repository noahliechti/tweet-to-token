import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Paper,
  TextField,
} from "@mui/material";

import Login from "./Login/Login";
import Mover from "./Mover/Mover";
import Config from "./Config/Config";
import ImageCreation from "./ImageCreation/ImageCreation";
import Minter from "./Minter/Minter";
import ConditionalFormWrapper from "./ConditionalFormWrapper/ConditionalFormWrapper";
import MintMessage from "./MintMessage/MintMessage";

import { BASE_URL, FUNCTIONS_PREFIX, ALERT_CODES } from "../../config/globals";

import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as OSIcon } from "../../assets/icons/opensea.svg";
import { ReactComponent as UploadGraphic } from "../../assets/graphics/upload.svg";

const tweetURLPattern =
  /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?twitter\.com\/(\w+)\/status\/(\d+)$/i;

// TODO: DRY
const getTweetId = (tweetURL) => {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
};

function Steps({
  userId,
  contract,
  signer,
  deployer,
  setActiveAlert,
  setSnackPack,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);
  const [imageData, setImageData] = React.useState();
  const [nftMetadata, setNftMetadata] = React.useState();
  const [state, setState] = React.useState({
    theme: "light",
    language: "en",
    tweetURL: "",
    invalidTweetURLMessage: "",
    formErrorMessage: "",
  });
  const { active, account, chainId } = useWeb3React();

  useEffect(() => {
    const currentLocalStorageStep = parseInt(
      window.localStorage.getItem("step"),
      10
    );

    if ((!account || !userId) && activeStep > 0) {
      setFormIsSubmitting(false);
      window.localStorage.setItem("step", 0);
      setActiveStep(() => 0);
      setActiveAlert(ALERT_CODES.LOGOUT);
    }
    // jumps to active step after page reload
    if (account && userId && currentLocalStorageStep > activeStep) {
      setActiveStep(currentLocalStorageStep);
    }
  }, [account, activeStep, setActiveAlert, userId]);

  // TODO: cache
  useEffect(() => {
    const activeTweetURL = window.localStorage.getItem("activeTweetURL");

    if (activeTweetURL && !state.tweetURL) {
      setState({
        ...state,
        tweetURL: activeTweetURL,
      });
    }
  }, [state]);

  useEffect(() => {
    const activeTweetURL = window.localStorage.getItem("activeTweetURL");

    if (activeStep === 3) {
      if ((!nftMetadata || !imageData) && activeTweetURL) {
        // get cached data
        fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/cache`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            tweetId: getTweetId(activeTweetURL),
          }),
        })
          .then(async (res) => {
            if (res.status === 200) return res.json();
            const errorMessage = (await res.json()).error;
            throw new Error(errorMessage);
          })
          .then((data) => {
            const { image, metadata } = data;
            setImageData(image);
            setNftMetadata(metadata);
          })
          .catch(() => {
            window.localStorage.setItem("step", 0);
            setActiveStep(0);
          });
      } else {
        // window.localStorage.setItem("step", 0);
        // setActiveStep(0);
      }
    }
  }, [activeStep, imageData, nftMetadata, state.tweetURL]);

  const handleChange = (target) => {
    const { value } = target;
    const { name } = target;

    if (name === "tweetURL") {
      const trimmedURL = value.split("?")[0];
      const invalidTweetURLMessage =
        value && !tweetURLPattern.test(trimmedURL)
          ? "This URL is not valid."
          : "";
      // TODO: cache
      window.localStorage.setItem("activeTweetURL", trimmedURL);

      setState({
        ...state,
        [name]: trimmedURL,
        invalidTweetURLMessage: invalidTweetURLMessage,
      });
      return;
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleNext = () => {
    setState({
      ...state,
      formErrorMessage: "",
    });
    window.localStorage.setItem("step", activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    window.localStorage.setItem("step", activeStep - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    window.localStorage.setItem("step", 2);
    setActiveStep(2);
    setState({
      ...state,
      tweetURL: "",
    });
  };

  const getTokenURI = () =>
    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        imageData: imageData,
        tweetURL: state.tweetURL,
        metadata: nftMetadata,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) return res.json();
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage);
      })
      .then((data) => data.tokenURI)
      .catch((err) => {
        setState({
          ...state,
          formErrorMessage: err.message,
        });
        setFormIsSubmitting(false);
      });

  const showTemporaryMessage = (message) => {
    setSnackPack((prev) => [
      ...prev,
      {
        message: message,
        key: new Date().getTime(),
      },
    ]);
  };

  const handleMint = async () => {
    setFormIsSubmitting(true);

    showTemporaryMessage("Uploading Tweet and Metadata to IPFS...");
    const tokenURI = await getTokenURI();
    const tweetId = ethers.BigNumber.from(getTweetId(state.tweetURL));

    // Set allowed Tweet
    let tx = await contract
      .connect(deployer)
      .addVerifiedTweet(account, tweetId, tokenURI);
    await tx.wait();

    showTemporaryMessage("Upload successful! Minting has started...");

    // Mint Tweet
    tx = await contract.connect(signer).mintTweet(tweetId);
    await tx.wait();

    showTemporaryMessage(<MintMessage tx={tx} chainId={chainId} />); // TODO: what if someone changes chain?

    setFormIsSubmitting(false);
    handleNext();
  };

  const isDuplicateTweet = async () => {
    // TODO: different check
    const tweetId = ethers.BigNumber.from(getTweetId(state.tweetURL));
    if (await contract.tweetIdToTokenURI(tweetId)) {
      setState({
        ...state,
        formErrorMessage: "This Tweet was already minted!",
      });
      return true;
    }
    return false;
  };

  const saveToCache = async (image, metadata, language, theme, tweetURL) => {
    await fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/cache`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ image, metadata, tweetURL, language, theme }),
    }).then(async (res) => {
      if (res.status !== 200) {
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage); // get's catched in function caller
      }
    });
  };

  // eslint-disable-next-line arrow-body-style
  const isImageCached = () => {
    const { tweetURL, language, theme } = state;

    return fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/cache`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ tweetURL, theme, language }),
    })
      .then(async (res) => {
        if (res.status === 200) return res.json();
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage);
      })
      .then((data) => {
        const { image, metadata } = data;

        if (image && metadata) {
          setImageData(image);
          setNftMetadata(metadata);
          return true;
        }
        return false;
      })
      .catch(
        () =>
          // window.localStorage.setItem("step", 0);
          // setActiveStep(0);
          false
      );
  };

  const handleImageFetch = async () => {
    const { tweetURL, language, theme } = state;
    setFormIsSubmitting(true);
    setImageData("");

    if (await isDuplicateTweet()) {
      setFormIsSubmitting(false);
      return;
    }

    if (await isImageCached(language, theme, tweetURL)) {
      setFormIsSubmitting(false);
      handleNext();
      return;
    }

    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ tweetURL, language, theme, userId }),
    })
      .then(async (res) => {
        if (res.status === 200) return res.json();
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage);
      })
      .then(async (data) => {
        const { image, metadata } = data;
        setImageData(image);
        setNftMetadata(metadata);
        await saveToCache(image, metadata, language, theme, tweetURL);
        setFormIsSubmitting(false);
        handleNext();
      })
      .catch((err) => {
        setState({
          ...state,
          formErrorMessage: err.message,
        });
        setFormIsSubmitting(false);
      });
  };

  const steps = [
    {
      label: "Connect",
      content: <Login twitterLoggedIn={!!userId} />,
      nextBtnText: "Continue",
      handleNext: handleNext,
    },

    {
      label: "Choose Style",
      content: (
        <Config
          handleChange={handleChange}
          defaultTheme={state.theme}
          defaultLanguage={state.language}
        />
      ),
      nextBtnText: "Continue",
      handleNext: handleNext,
    },
    {
      label: "Clone Tweet",
      isForm: true,
      content: (
        <>
          <ImageCreation />
          <TextField
            label="Tweet URL"
            fullWidth
            name="tweetURL"
            value={state.tweetURL}
            disabled={formIsSubmitting}
            onChange={(e) => handleChange(e.target)}
            error={!!state.invalidTweetURLMessage}
            helperText={state.invalidTweetURLMessage}
            sx={{ mt: 2 }}
          />
        </>
      ),
      nextBtnText: "Clone",
      handleNext: handleImageFetch,
    },
    {
      label: "Mint Tweet",
      isForm: true,
      content: <Minter imageData={imageData} />,
      nextBtnText: "Mint",
      handleNext: handleMint,
    },
  ];

  const nextBtnDisabled = [
    !(contract && active && userId), // TODO: pass as prop; only if valid network and contract exists
    !(state && state.language && state.theme),
    !!state.invalidTweetURLMessage || !state.tweetURL,
  ];

  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item xs={12} md={6}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, i) => (
            <Step key={step.label}>
              <StepLabel sx={{ pt: 0 }}>
                <Typography variant="h3" color="text.secondary">
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent sx={{ pr: 3 }}>
                <ConditionalFormWrapper
                  condition={step.isForm}
                  error={state.formErrorMessage}
                >
                  {step.content}
                  <Mover
                    nextBtnDisabled={nextBtnDisabled[i] || formIsSubmitting}
                    backBtnDisabled={activeStep < 1 || formIsSubmitting}
                    handleNext={step.handleNext}
                    handleBack={handleBack}
                    isForm={step.isForm}
                    nextBtnText={step.nextBtnText}
                    isLoading={formIsSubmitting}
                  />
                </ConditionalFormWrapper>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              Congratulations! You successfully minted your NFT. Make sure to
              share you creation with your Twitter community.
            </Typography>
            <Button
              variant="contained"
              endIcon={<TwitterIcon width="24px" height="24px" />}
              sx={{ mt: 1, mr: 1, width: 1 }}
              href={`http://twitter.com/intent/tweet?text=I%20just%20minted%20my%20Tweet%20with%20%0A%40tweettokenio%0A.%20Have%20a%20look%21%0A&url=https%3A%2F%2Ftestnets.opensea.io%2Fassets%2F0x0a6c40aec8f7e26c857b45dfe5d33471c4a8beb0%2F${getTweetId(
                state.tweetURL
              )}`}
              target="_blank"
              rel="noopener"
            >
              share nft
            </Button>
            <Button
              variant="outlined"
              endIcon={<OSIcon width="24px" height="24px" />}
              sx={{ mt: 1, mr: 1, width: 1 }}
              href={`https://testnets.opensea.io/assets/${
                contract.address
              }/${getTweetId(state.tweetURL)}`}
              target="_blank"
              rel="noopener"
            >
              view nft
            </Button>
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{ mt: 1, mr: 1, width: 1 }}
            >
              create another
            </Button>
          </Paper>
        )}
      </Grid>
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <UploadGraphic />
      </Grid>
    </Grid>
  );
}

export default Steps;
