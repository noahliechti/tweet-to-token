import { Grid, Box, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import FaqElement from "./FaqElement/FaqElement";
import { ETHERSCAN_URL } from "../../config/globals";

import { ReactComponent as QuestionsGraphic } from "../../assets/graphics/question.svg";
import addressMap from "../../config/contracts/map.json";

function Faq({ chainId }) {
  const [etherscanURL, setEtherscanURL] = useState();

  useEffect(() => {
    if (chainId) {
      setEtherscanURL(
        ETHERSCAN_URL(chainId, "address", addressMap[chainId].TweetToken)
      );
    }
  }, [chainId]);

  const faqs = [
    {
      summary: "Why do I have to sign in with Twitter?",
      detail:
        "By signing in with Twitter we can ensure, that users only mint their own tweets.",
    },
    {
      summary: "What metadata gets stored?",
      detail: (
        <Box>
          <Typography>We store the following metadata:</Typography>
          <ul>
            <li>Time: month, year</li>
            <li>User: user id, username, verified</li>
            <li>
              Tweet: characters, device, likes, retweets, quotes, replies,
              attachments, polls
            </li>
            <li>Custom: theme, language</li>
          </ul>
          <Typography>
            The metadata represents the state of the Tweet when it was minted.
            The metadata will never be updated.
          </Typography>
        </Box>
      ),
    },
    {
      summary: "How does tweettoken.io store NFT metadata?",
      detail:
        "We store NFT metadata on IPFS. If you create or buy an NFT from tweettoken.io, that NFT's image, description, and name will never change!",
    },
    {
      summary: "How much does it cost to mint a Tweet with tweettoken.io?",
      detail:
        "Creating a Tweet with tweettoken.io is free. You only pay the gas fees for the minting.",
    },
    {
      summary: "Where can I look at the smart contract?",
      detail: (
        <Typography>
          Our smart contracts are verified and open-source. Inspect them on{" "}
          <Link href={etherscanURL} target="_blank" rel="noopener">
            Etherscan
          </Link>
          .
        </Typography>
      ),
    },
    {
      summary: "Can I mint protected Tweets?",
      detail: "Minting protected Tweets is not supported at the moment.",
    },
  ];

  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item xs={12} md={6}>
        {faqs.map((e) => (
          <Box key={e.summary} sx={{ mt: 2 }}>
            <FaqElement {...e} />
          </Box>
        ))}
      </Grid>
      <Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
        <QuestionsGraphic />
      </Grid>
    </Grid>
  );
}
export default Faq;
