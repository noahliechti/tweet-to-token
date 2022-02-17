import React from "react";
import { IconButton } from "@mui/material";

import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as CodeIcon } from "../../assets/icons/code.svg";
import { ReactComponent as OSIcon } from "../../assets/icons/opensea.svg";

function Social() {
  return (
    <>
      <IconButton
        size="large"
        aria-label="twitter"
        href="https://twitter.com/tweettokenio"
        color="inherit"
        target="_blank"
        rel="noopener"
      >
        <TwitterIcon width="24px" height="24px" />
      </IconButton>
      <IconButton
        size="large"
        aria-label="opensea"
        href="https://opensea.io/collection/tweettoken.io" // TODO: dev link
        color="inherit"
        target="_blank"
        rel="noopener"
      >
        <OSIcon width="24px" height="24px" />
      </IconButton>
      <IconButton
        size="large"
        aria-label="github"
        href="https://github.com/noahliechti/tweet-to-token"
        color="inherit"
        target="_blank"
        rel="noopener"
      >
        <CodeIcon width="24px" height="24px" />
      </IconButton>
    </>
  );
}

export default Social;
