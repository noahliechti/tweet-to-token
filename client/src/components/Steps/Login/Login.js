import React from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../config/connectors";
import { Box, ToggleButton, Link } from "@mui/material";
import { BASE_URL, FUNCTIONS_PREFIX } from "../../../config/globals";

function Login({ twitterLoggedIn }) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const handleClick = async (e) => {
    if (e.target.name === "wallet") {
      try {
        await activate(injected);
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function disconnect() {
    try {
      deactivate();
    } catch (error) {
      console.log(error);
    }
  }

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
        href={`${BASE_URL}${FUNCTIONS_PREFIX}/auth/login`}
        selected={twitterLoggedIn}
        // variant="primary"
        fullWidth
        sx={{ mt: 1 }}
      >
        login with twitter
      </ToggleButton>
      <ToggleButton
        value="1"
        name="wallet"
        selected={active}
        // variant="primary"
        onClick={handleClick}
        fullWidth
        sx={{ mt: 1 }}
      >
        connect with wallet
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
