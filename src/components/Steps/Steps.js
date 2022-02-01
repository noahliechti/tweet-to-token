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

import { BASE_URL, FUNCTIONS_PREFIX } from "../../config/globals";

function Steps({ twitterUser }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [state, setState] = React.useState({
    theme: "light",
    language: "en",
    tweetURL: "",
  });

  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);
  const [imageData, setImageData] = React.useState();

  const handleChange = (target) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
    // TODO: reset state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageData("");
    setFormIsSubmitting(true);
    fetch(`${BASE_URL}${FUNCTIONS_PREFIX}/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        tweetURL: state.tweetURL,
        language: state.language,
        theme: state.theme,
      }),
    })
      .then((payload) => payload.json())
      .then((data) => {
        // console.log("post submit", data.image); // TODO: throw error?
        const { image } = data;
        setFormIsSubmitting(false);
        setImageData(image);
        handleNext();
      })
      .catch(() => {
        // console.log("ERROR. Something went wrong.", err); // TODO:
        setFormIsSubmitting(false);
      });
  };

  const steps = [
    {
      label: "Connect Twitter and Metamask",
      content: <Login twitterLoggedIn={!!twitterUser} />,
      nextBtnName: "next",
      nextBtnText: "Continue",
    },
    {
      label: "Configure appearance of Tweet",
      content: (
        <Config
          handleChange={handleChange}
          defaultTheme={state.theme}
          defaultLanguage={state.language}
        />
      ),
      nextBtnName: "next",
      nextBtnText: "Continue",
    },
    {
      label: "Provide link to Tweet",
      content: <ImageCreation />,
      formContent: (
        <TextField
          label="Tweet URL"
          fullWidth
          name="tweetURL"
          value={state.tweetURL}
          disabled={formIsSubmitting}
          onChange={(e) => handleChange(e.target)}
          // helperText="More infos about the URL in the FAQ"
          sx={{ mt: 2 }}
        />
      ),
      nextBtnName: "create-image",
      nextBtnText: "Create Image",
    },
    {
      label: "Mint Tweet-NFT",
      content: <Minter imageData={imageData} />,
      nextBtnName: "mint-nft",
      nextBtnText: "Mint NFT",
    },
  ];

  const nextBtnDisabled = [
    !(useWeb3React().active && twitterUser),
    !(state && state.language && state.theme),
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
              {step.content}
              {step.formContent ? (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  {step.formContent}
                  <Mover
                    nextBtnDisabled={nextBtnDisabled[i] || formIsSubmitting}
                    backBtnDisabled={activeStep < 2 || formIsSubmitting}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    isForm
                    nextBtnName={step.nextBtnName}
                    nextBtnText={step.nextBtnText}
                    isLoading={formIsSubmitting}
                  />
                </form>
              ) : (
                <Mover
                  nextBtnDisabled={nextBtnDisabled[i] || formIsSubmitting}
                  backBtnDisabled={activeStep < 2 || formIsSubmitting}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  isForm={false}
                  nextBtnName={step.nextBtnName}
                  nextBtnText={step.nextBtnText}
                />
              )}
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
