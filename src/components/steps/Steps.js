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
} from "@mui/material";
import LanguageInput from "../languageInput/LanguageInput";

function Steps() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      setLoggedIn(() => true);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1 }}>
                  {step.buttonLabel}
                </Button>
                <Button
                  disabled={index === 0 || (index === 1 && loggedIn === true)}
                  onClick={handleBack}
                  sx={{ mt: 1 }}
                >
                  Back
                </Button>
              </Box>
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

const steps = [
  {
    label: "Connect to your Twitter account and your Metamask wallet",
    content: (
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" sx={{ mt: 1 }}>
          connect to twitter
        </Button>
        <Button variant="contained" sx={{ mt: 1 }}>
          connect wallet
        </Button>
      </Box>
    ),
    buttonLabel: "Continue",
  },
  {
    label: "Select a theme and a language",
    content: (
      <Box>
        <Typography>
          Choose the theme and the language the Tweet should have.
        </Typography>
        <LanguageInput></LanguageInput>
      </Box>
    ),
    buttonLabel: "Continue",
  },
  {
    label: "Past the link of a tweet",
    content: (
      <Box>
        <Typography>
          Copy the link of the Tweet you want to mint and paste it into the
          input field. The link should have the following format
        </Typography>
        <Box sx={{ width: 1 / 1, wordWrap: "break-word" }}>
          <code>
            https://twitter.com/Rainmaker1973/status/1478285768493834240
          </code>
        </Box>
        <TextField label="Tweet URL" sx={{ width: 1 / 1 }} />
        <Button>Create image</Button>
      </Box>
    ),
    buttonLabel: "Continue",
  },
  {
    label: "Create NFT",
    content: (
      <Typography>
        Wait until you see the Tweet and click on 'Create NFT'.
      </Typography>
    ),
    buttonLabel: "Create NFT",
  },
];