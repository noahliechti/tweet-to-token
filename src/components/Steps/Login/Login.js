import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, ToggleButton, Link } from "@mui/material";
import { injected } from "../../../config/connectors";
import { BASE_URL, FUNCTIONS_PREFIX } from "../../../config/globals";

function Login({ twitterLoggedIn }) {
  const { active, activate, deactivate } = useWeb3React();

  // useEffect(() => {
  //   console.log(
  //     "library",
  //     active,
  //     library,
  //     library ? library.getSigner() : null,
  //     connector,
  //     chainId
  //   );
  // }, [active, chainId, connector, library]);

  const loginLinkToggle = twitterLoggedIn ? "/auth/logout" : "/auth/login";

  const handleClick = async (e) => {
    if (e.target.name === "wallet") {
      try {
        if (active) {
          deactivate();
        } else {
          await activate(injected);
        }
        window.localStorage.setItem("ConnectedMM", !active);
      } catch (err) {
        // console.log(err); // TODO: error message
      }
    }
  };

  // const error = !(loginStates.twitter && loginStates.wallet);
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
        {active ? "logout from wallet" : "connect with wallet"}
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
