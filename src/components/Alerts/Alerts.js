import React from "react";
import { Box, Slide, Alert, IconButton, AlertTitle } from "@mui/material";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const alertMessages = [
  {
    severity: "warning",
    title: "Unsupported Network",
    text: "Please switch to Mainnet or Rinkeby.",
  },
  {
    severity: "error",
    title: "Smart Contract not found",
    text: "Contract missing for this network.",
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
];

function Alerts({ activeAlert }) {
  const [open, setOpen] = React.useState(true);
  const { severity, title, text } = alertMessages[activeAlert - 1];

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
