import { Grid, Box, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import FaqElement from "./FaqElement/FaqElement";
import { ETHERSCAN_URL } from "../../config/globals";

import { ReactComponent as QuestionsGraphic } from "../../assets/graphics/question.svg";
import addressMap from "../../config/contracts/map.json";

function Faq({ chainId }) {
  const [etherscanURL, setEtherscanURL] = useState("https://etherscan.io");

  useEffect(() => {
    if (chainId && addressMap[chainId]) {
      setEtherscanURL(
        ETHERSCAN_URL(chainId, "address", addressMap[chainId].TweetToken)
      );
    }
  }, [chainId]);

  const faqs = [
    {
      summary: "Why do I have to sign in with Twitter?",
      detail:
        "By signing in with Twitter we can ensure, that users only mint their own tweets. This is also enforced at the smart contract level.",
    },
    {
      summary: "I don't want to creat an NFT, but how can I buy one?",
      detail: (
        <Box>
          Head over to our{" "}
          <Link
            href="https://opensea.io/collection/tweettoken.io" // TODO: dev link
            target="_blank"
            rel="noopener"
          >
            OpenSea
          </Link>{" "}
          collection to see the NFTs that are currently in the market!
        </Box>
      ),
    },
    {
      summary: "What metadata gets stored?",
      detail: (
        <Box>
          <Typography>We store the following metadata:</Typography>
          <ul>
            <li>User: user id, username, verified</li>
            <li>
              Tweet: characters, device, likes, retweets, quotes, replies,
              attachments, polls, creation date
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
      summary: "Why does tweettoken.io use Polygon?",
      detail: (
        <Box>
          <Typography>There are three main reasons:</Typography>
          <ul>
            <li>environmentally friendly</li>
            <li>fast transactions</li>
            <li>low gas fees</li>
          </ul>
        </Box>
      ),
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
    // {
    //   summary: "Can I mint protected Tweets?",
    //   detail: "Minting protected Tweets is not supported at the moment.",
    // },
    {
      summary: "How can I contact tweettoken.io",
      detail: (
        <Box>
          <Typography>
            There are many ways to contact us. Please choose the appropriate
            channel:
          </Typography>
          <ul>
            <li>
              Found a security vulnerability? Drop us a DM on{" "}
              <Link
                href="https://twitter.com/messages/compose?recipient_id=1472196662902808579"
                target="_blank"
                rel="noopener"
              >
                Twitter
              </Link>
            </li>
            <li>
              Found a bug? Open an issue on{" "}
              <Link
                href="https://github.com/noahliechti/tweet-to-token/issues"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </Link>
            </li>
            <li>
              Feature request? Open an issue on{" "}
              <Link
                href="https://github.com/noahliechti/tweet-to-token/issues"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </Link>
            </li>
            <li>
              Question? Drop us a DM on{" "}
              <Link
                href="https://twitter.com/messages/compose?recipient_id=1472196662902808579"
                target="_blank"
                rel="noopener"
              >
                Twitter
              </Link>
            </li>
          </ul>
        </Box>
      ),
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
