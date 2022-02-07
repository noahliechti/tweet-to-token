import React from "react";
import { Slide, Alert, IconButton, Box } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

function ClosableAlert({ message }) {
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ position: "sticky", top: 16, zIndex: "snackbar" }}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Alert
          severity="error"
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
          {message}
        </Alert>
      </Slide>
    </Box>
  );
}

export default ClosableAlert;
