import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Link, Button } from "@mui/material";
import { injected } from "../../../config/connectors";
import { BASE_URL, FUNCTIONS_PREFIX } from "../../../config/globals";
import { ReactComponent as TwitterIcon } from "../../../assets/icons/twitter.svg";
import { ReactComponent as WalletIcon } from "../../../assets/icons/wallet.svg";

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
      <Button
        value="1"
        name="twitter"
        component={Link}
        href={`${BASE_URL}${FUNCTIONS_PREFIX}${loginLinkToggle}`}
        // selected={twitterLoggedIn}
        onClick={handleClick}
        variant="contained"
        fullWidth
        endIcon={<TwitterIcon />}
        sx={{ mt: 1 }}
      >
        {twitterLoggedIn ? "disconnect" : "connect"}
      </Button>
      <Button
        value="1"
        name="wallet"
        // selected={active}
        variant="contained"
        onClick={handleClick}
        fullWidth
        endIcon={<WalletIcon />}
        sx={{ mt: 1 }}
      >
        {active ? beautifyAddress(account) : "connect"}
      </Button>
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
