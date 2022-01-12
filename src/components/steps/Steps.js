import React from "react";
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
  FormControl,
  FormGroup,
  FormHelperText,
} from "@mui/material";

import Login from "./login/Login";
import Mover from "./mover/Mover";
import Config from "./config/Config";
import ImageCreation from "./imageCreation/ImageCreation";
import Minter from "./minter/Minter";

function Steps() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [loginStates, setLoginStates] = React.useState();
  const [inputState, setInputState] = React.useState();
  const [configStates, setConfigStates] = React.useState({
    theme: "light",
    language: "en",
  });

  const [imageData, setImageData] = React.useState();

  const [formIsSubmitting, setFormIsSubmitting] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log("next");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageData("");
    setFormIsSubmitting(true);
    fetch(
      apiURL +
        `/get-image?tweetURL=${inputState.tweetURL}&language=${configStates.language}&theme=${configStates.theme}`
    )
      .then((payload) => payload.json().image)
      .then((image) => {
        console.log("post submit", image);
        setFormIsSubmitting(false);
        setImageData(image);
        handleNext();
      })
      .catch((err) => {
        console.log("ERROR. Something went wrong.", err);
        setFormIsSubmitting(false);
      });
  };

  const handleLoginButtonClick = (target) => {
    const { name, value } = target;
    setLoginStates({
      ...loginStates,
      [name]: value,
    });
  };

  const handleConfigClick = (target) => {
    const { name, value } = target;
    setConfigStates({
      ...configStates,
      [name]: value,
    });
  };

  const handleInputChange = (target) => {
    const { name, value } = target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const steps = [
    {
      label: "Connect to your Twitter account and your Metamask wallet",
      content: <Login handleLoginButtonClick={handleLoginButtonClick} />,
      nextBtnName: "next",
      nextBtnText: "Continue",
    },
    {
      label: "Select the theme and the language",
      content: (
        <Config
          handleConfigClick={handleConfigClick}
          defaultTheme={configStates.theme}
          defaultLanguage={configStates.language}
        />
      ),
      nextBtnName: "next",
      nextBtnText: "Continue",
    },
    {
      label: "Provide the link of your tweet",
      content: <ImageCreation />,
      formContent: (
        <TextField
          label="Tweet URL"
          fullWidth
          name="tweetURL"
          disabled={formIsSubmitting}
          onChange={(e) => handleInputChange(e.target)}
          // helperText="More infos about the URL in the FAQ"
          sx={{ mt: 2 }}
        />
      ),
      nextBtnName: "create-image",
      nextBtnText: "Create Image",
    },
    {
      label: "Mint NFT",
      content: <Minter />,
      nextBtnName: "mint-nft",
      nextBtnText: "Mint NFT",
    },
  ];

  const nextBtnDisabled = [
    !(loginStates && loginStates.wallet && loginStates.twitter),
    !(configStates && configStates.language && configStates.theme),
  ];

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, i) => (
          <Step key={step.label}>
            <StepLabel sx={{ pt: 0 }}>{step.label}</StepLabel>
            <StepContent>
              {step.content}
              {step.formContent ? (
                <form onSubmit={handleSubmit}>
                  {step.formContent}
                  <Mover
                    nextBtnDisabled={nextBtnDisabled[i] || formIsSubmitting}
                    backBtnDisabled={activeStep < 2 || formIsSubmitting}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    isForm={true}
                    nextBtnName={step.nextBtnName}
                    nextBtnText={step.nextBtnText}
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

const apiURL = "http://localhost:3000";
//   process.env.REACT_APP_ENV === "development"
//     ? "http://localhost:3000"
//     : "https://get-tweet-data-image.herokuapp.com";
// console.log(apiURL, process.env.REACT_APP_ENV);
