import React from "react";
import { Link } from "@mui/material";
import { ETHERSCAN_URL } from "../../../config/globals";

function MintMessage({ tx, chainId }) {
  return (
    <>
      Success! View transaction on{" "}
      <Link
        href={ETHERSCAN_URL(chainId, "tx", tx.hash)}
        target="_blank"
        rel="noopener"
        color="inherit"
      >
        etherscan
      </Link>
      .
    </>
  );
}

export default MintMessage;
