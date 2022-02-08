import React, { useEffect, useState } from "react";
import { Box, Link, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";

import { injected } from "../../../config/connectors";
import { BASE_URL, FUNCTIONS_PREFIX } from "../../../config/globals";
import { ReactComponent as TwitterIcon } from "../../../assets/icons/twitter.svg";
import { ReactComponent as WalletIcon } from "../../../assets/icons/wallet.svg";

const beautifyAddress = (address) =>
  `${address.substr(0, 6)}...${address.substr(-4)}`;

function Login({ twitterLoggedIn }) {
  const [loading, setLoading] = useState(false);
  const [walletButtonText, setWalletButtonText] = useState();
  const { active, activate, deactivate, account, error } = useWeb3React();

  const loginLinkToggle = twitterLoggedIn ? "/auth/logout" : "/auth/login";

  // if user reloads window the button is still loading on pending requests
  useEffect(() => {
    if (window.localStorage.getItem("isConnecting")) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      setWalletButtonText("switch network");
    } else if (active) {
      setWalletButtonText(beautifyAddress(account));
    } else {
      setWalletButtonText("connect");
    }
  }, [account, active, error]);

  const handleClick = async (e) => {
    if (e.target.name === "wallet") {
      if (active) {
        deactivate();
        window.localStorage.removeItem("ConnectedToMM");
      } else if (window.localStorage.getItem("ConnectedToMM")) {
        // Currently on an unsupported network
        setLoading(true);
        window.localStorage.setItem("isConnecting", true);

        window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          })
          .then(() => {
            window.localStorage.removeItem("isConnecting");
            setLoading(false);
          })
          .catch(() => {
            window.localStorage.removeItem("isConnecting");
            setLoading(false);
          });
      } else {
        setLoading(true);
        window.localStorage.setItem("isConnecting", true);
        await activate(injected).then(() => {
          window.localStorage.removeItem("isConnecting");
          setLoading(false);
        });
        window.localStorage.setItem("ConnectedToMM", true);
      }
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        value="1"
        name="twitter"
        component={Link}
        href={`${BASE_URL}${FUNCTIONS_PREFIX}${loginLinkToggle}`}
        onClick={handleClick}
        variant="contained"
        fullWidth
        endIcon={<TwitterIcon />}
        sx={{ mt: 1 }}
      >
        {twitterLoggedIn ? "disconnect" : "connect"}
      </Button>
      <LoadingButton
        loading={loading}
        loadingIndicator="connecting..."
        value="1"
        name="wallet"
        variant="contained"
        onClick={handleClick}
        fullWidth
        endIcon={<WalletIcon />}
        sx={{ mt: 1 }}
      >
        {walletButtonText}
      </LoadingButton>
    </Box>
  );
}

export default Login;
