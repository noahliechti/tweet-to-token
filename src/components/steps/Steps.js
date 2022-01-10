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
  ToggleButton,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LanguageInput from "../languageInput/LanguageInput";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { ReactComponent as ExpandIcon } from "../../assets/icons/expand.svg";

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
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ flexGrow: 1 }}
                  onClick={handleNext}
                >
                  {step.buttonLabel}
                </Button>
                <Button
                  variant="outlined"
                  disabled={index === 0 || (index === 1 && loggedIn === true)}
                  sx={{ flexGrow: 1 }}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Stack>
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
        <ToggleButton
          value="logged-in"
          // variant="primary"
          fullWidth
          sx={{ mt: 1 }}
        >
          connect to twitter
        </ToggleButton>
        <ToggleButton
          value="logged-in"
          // variant="primary"
          fullWidth
          sx={{ mt: 1 }}
        >
          connect wallet
        </ToggleButton>
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
        <ThemeToggle></ThemeToggle>
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
          input field.
        </Typography>

        <TextField
          label="Tweet URL"
          required
          fullWidth
          // helperText="More infos about the URL in the FAQ"
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 2 }}>
          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandIcon />}
              // aria-controls="panel1a-content"
              // id="panel1a-header"
            >
              <Typography>How can I find the link of a Tweet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Finding the link to a Tweet you want to share isn't obvious, but
                it's also not difficult. Here is an easy method.
              </Typography>
              <ol>
                <li>Navigate to the Tweet</li>
                <li>Open the Share Menu</li>
                <li>Click the "Copy link to Tweet" Option</li>
              </ol>
              <Typography>
                Check if your link has the following format:
              </Typography>
              <Box sx={{ width: 1, wordWrap: "break-word" }}>
                <code>
                  https://twitter.com/YourUsername/status/SomeRandomBigNumber
                </code>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Button variant="contained" sx={{ width: 1, mt: 2 }}>
          Create image
        </Button>
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
