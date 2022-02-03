import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, ToggleButton, Link } from "@mui/material";
import { injected } from "../../../config/connectors";
import { BASE_URL, FUNCTIONS_PREFIX } from "../../../config/globals";

const beautifyAddress = (address) =>
  `${address.substr(0, 6)}...${address.substr(-4)}`;

function Login({ twitterLoggedIn }) {
  const { active, activate, deactivate, account } = useWeb3React();

  const loginLinkToggle = twitterLoggedIn ? "/auth/logout" : "/auth/login";

  const handleClick = async (e) => {
    if (e.target.name === "wallet") {
      if (active) {
        deactivate();
        window.localStorage.removeItem("ConnectedToMM");
      } else {
        await activate(injected);
        window.localStorage.setItem("ConnectedToMM", true);
      }
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* <FormControl error={error}> */}
      {/* <FormGroup></FormGroup> */}
      <ToggleButton
        value="1"
        name="twitter"
        component={Link}
        href={`${BASE_URL}${FUNCTIONS_PREFIX}${loginLinkToggle}`}
        selected={twitterLoggedIn}
        onClick={handleClick}
        // variant="primary"
        fullWidth
        sx={{ mt: 1 }}
      >
        {twitterLoggedIn ? "logout from twitter" : "login with twitter"}
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
        {active ? beautifyAddress(account) : "connect metamask"}
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
