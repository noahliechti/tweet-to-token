import React from "react";
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

import { BASE_URL, FUNCTIONS_PREFIX } from "../../config/globals";

const tweetURLPattern =
  /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?twitter\.com\/(\w+)\/status\/(\d+)$/i;

function Steps({ twitterUser }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);
  const [imageData, setImageData] = React.useState();
  const [state, setState] = React.useState({
    theme: "light",
    language: "en",
    tweetURL: "",
    invalidTweetURLMessage: "",
    formErrorMessage: "",
  });

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

  const handleMint = () => {
    setFormIsSubmitting(true);

    // Get TokenURI
    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        metadata: "",
        imageData: imageData,
        tweetURL: state.tweetURL,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) return res.json();
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage);
      })
      .then((data) => {
        const { tokenURI } = data;
        setFormIsSubmitting(false);
        // TODO: set state
        handleNext();
        return tokenURI;
      })
      .catch(() => {
        // TODO: set error message
        // setState({
        //   ...state,
        //   formErrorMessage: err.message,
        // });
        setFormIsSubmitting(false);
      });

    // Set allowed tweet

    // Mint tweet
  };

  const handleImageFetch = () => {
    // TODO: CACHE IMAGE, AND USE CACHED IMAGE
    setFormIsSubmitting(true);
    setImageData("");
    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        tweetURL: state.tweetURL,
        language: state.language,
        theme: state.theme,
        twitterUserId: twitterUser.userId,
      }),
    })
      // eslint-disable-next-line consistent-return
      .then(async (res) => {
        if (res.status === 200) return res.json();
        const errorMessage = (await res.json()).error;
        throw new Error(errorMessage);
      })
      .then((data) => {
        const { image } = data;
        setFormIsSubmitting(false);
        setImageData(image);
        setState({
          ...state,
          formErrorMessage: "",
        });
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
      label: "Establish Connection",
      content: <Login twitterLoggedIn={!!twitterUser} />,
      nextBtnText: "Continue",
      handleNext: handleNext,
    },

    {
      label: "Choose Tweet Style",
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
      label: "Mint Tweet-NFT",
      content: <Minter imageData={imageData} />,
      nextBtnText: "Mint NFT",
      handleNext: handleMint,
    },
  ];

  const nextBtnDisabled = [
    !(useWeb3React().active && twitterUser), // TODO: pass as prop; only if valid network and contract exists
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
            <StepContent>
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
            Congratulations! When you see the confirmation, the NFT was
            successfully created
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Create another NFT
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default Steps;
