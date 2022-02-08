import React, { useEffect } from "react";
import { Box, Slide, Alert, IconButton, AlertTitle } from "@mui/material";
import { CHAIN_ID_MAPPING } from "../../config/globals";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

function Alerts({ activeAlert, setAlertMessage }) {
  const [open, setOpen] = React.useState(true);
  const alertMessages = [
    {
      severity: "warning",
      title: "Unsupported Network",
      text: "Please switch to Mainnet or Rinkeby.",
    },
    {
      severity: "warning",
      title: "Logout during session",
      text: "You must be logged while minting.",
    },
    {
      severity: "warning",
      title: "MetaMask not found",
      text: "To continue you must install MetaMask.",
    },
    // {
    //   severity: "error",
    //   title: "Smart Contract not found",
    //   text: `Contract is missing for ${CHAIN_ID_MAPPING[chainId]}.`,
    // },
  ];
  const { severity, title, text } = alertMessages[activeAlert - 1];

  // reopens alerts if activeAlert changes
  useEffect(() => {
    setOpen(true);
  }, [activeAlert]);

  return (
    <Box sx={{ position: "sticky", top: 16, zIndex: "snackbar" }}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setAlertMessage(null); // reopens alert if same error happens
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            width: 1,
            mb: 2,
          }}
        >
          {title && <AlertTitle>{title}</AlertTitle>}
          {text}
        </Alert>
      </Slide>
    </Box>
  );
}

export default Alerts;
