import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import {
  Box,
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
  setAlertMessage,
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
    if ((!account || !userId) && activeStep > 0) {
      setFormIsSubmitting(false);
      setActiveStep(() => 0);
      setAlertMessage(ALERT_CODES.LOGOUT);
    }
  }, [account, activeStep, setAlertMessage, userId]);

  const handleChange = (target) => {
    const { value } = target;
    const { name } = target;

    let invalidTweetURLMessage;

    if (name === "tweetURL") {
      invalidTweetURLMessage =
        value && !tweetURLPattern.test(value) ? "This URL is not valid." : "";
    }

    setState({
      ...state,
      [name]: value,
      invalidTweetURLMessage: invalidTweetURLMessage,
    });
  };

  const handleNext = () => {
    setState({
      ...state,
      formErrorMessage: "",
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
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

  const handleImageFetch = async () => {
    setFormIsSubmitting(true);
    setImageData("");

    if (await isDuplicateTweet()) {
      setFormIsSubmitting(false);
      return;
    }

    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        tweetURL: state.tweetURL,
        language: state.language,
        theme: state.theme,
        userId: userId,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) return res.json();
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage);
      })
      .then((data) => {
        const { image, metadata } = data;
        setFormIsSubmitting(false);
        setImageData(image);
        setNftMetadata(metadata);
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
    <Box sx={{ maxWidth: 400 }}>
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
            endIcon={<TwitterIcon />}
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
            endIcon={<OSIcon />}
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
    </Box>
  );
}

export default Steps;
