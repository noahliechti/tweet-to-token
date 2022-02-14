import React from "react";
import { IconButton, Snackbar } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

function Snacks({ snackPack, setSnackPack }) {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [messageInfo, open, setSnackPack, snackPack]);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={messageInfo ? messageInfo.message : undefined}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={handleClose}
        >
          <CloseIcon width="24px" height="24px" />
        </IconButton>
      }
    />
  );
}

export default Snacks;
