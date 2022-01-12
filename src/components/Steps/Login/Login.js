import React from "react";
import { Box, FormControl, ToggleButton, FormHelperText } from "@mui/material";

function Login({ handleChange }) {
  const handleClick = (e) => {
    handleChange(e.target);
  };

  // const error = !(loginStates.twitter && loginStates.wallet);
  // console.log(error, loginStates.twitter, loginStates.wallet);
  return (
    <Box sx={{ mb: 2 }}>
      {/* <FormControl error={error}> */}
      {/* <FormGroup></FormGroup> */}
      <ToggleButton
        value="1"
        name="twitter"
        // variant="primary"
        onClick={handleClick}
        fullWidth
        sx={{ mt: 1 }}
      >
        connect to twitter
      </ToggleButton>
      <ToggleButton
        value="1"
        name="wallet"
        // variant="primary"
        onClick={handleClick}
        fullWidth
        sx={{ mt: 1 }}
      >
        connect wallet
      </ToggleButton>
      {/* {error ? (
          <FormHelperText>
            You have to be logged in to Twitter and your wallet to continue
          </FormHelperText>
        ) : (
          <></>
        )} */}
      {/* </FormControl> */}
    </Box>
  );
}

export default Login;
