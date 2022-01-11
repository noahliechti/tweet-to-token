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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import Login from "./login/Login";
import Mover from "./mover/Mover";
import Config from "./config/Config";
import { ReactComponent as ExpandIcon } from "../../assets/icons/expand.svg";

function Steps() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loginStates, setLoginStates] = React.useState();
  const [configStates, setConfigStates] = React.useState();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
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
    console.log(name, value);
    setConfigStates({
      ...configStates,
      [name]: value,
    });
  };

  const steps = [
    {
      label: "Connect to your Twitter account and your Metamask wallet",
      content: <Login handleLoginButtonClick={handleLoginButtonClick} />,
      buttonLabel: "Continue",
    },
    {
      label: "Select a theme and a language",
      content: <Config handleConfigClick={handleConfigClick} />,
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
                  Finding the link to a Tweet you want to share isn't obvious,
                  but it's also not difficult. Here is an easy method.
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

  const continueBtnDisabled = [
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
              <Mover
                continueBtnDisabled={continueBtnDisabled[i]}
                backBtnDisabled={activeStep < 2}
                handleNext={handleNext}
                handleBack={handleBack}
              />
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
