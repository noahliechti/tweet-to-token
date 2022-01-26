import React from "react";
import { Box, ToggleButton, Link } from "@mui/material";

function Login({ handleChange, twitterLoggedIn }) {
  const handleClick = (e) => {
    if (e.target === "twitter") {
      return;
    }
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
        component={Link}
        href="http://localhost:5000/.netlify/functions/auth/login"
        selected={twitterLoggedIn}
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
