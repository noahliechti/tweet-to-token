require("dotenv").config();
const fs = require("fs");
const path = require("path");
const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const createScreenshot = require("./create-screenshot");

const PORT = process.env.PORT || 3000;
const HOST = "localhost";
const HEADERS = {
  Authorization: "Bearer " + process.env.BEARER_TOKEN,
};

const TWEET_WIDTH = 1000;
const TWEET_PADDING = 25;
const TWEET_HIDE_THREAD = true;
const TWEET_HIDE_CARD = false;

const app = express();

app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:1234", "http://localhost:1234"],
//   })
// );

app.use(express.static(path.join(__dirname, "..", "dist")));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${HOST}:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

function getTweetId(tweetURL) {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
}

app.get("/get-data", async (req, res) => {
  const tweetId = getTweetId(req.query.tweetURL);
  var config = {
    method: "get",
    // TODO: what attributes do I need?
    url: `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=created_at,attachments&expansions=author_id`,
    headers: HEADERS,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/get-image", async (req, res) => {
  const { tweetURL, theme, lang } = req.body;
  // const { tweetURL, theme, lang } = req.query;

  const tweetsTxtPath = path.join(__dirname, "..", "tweets.txt");
  const unixTime = Math.round(+new Date() / 1000);
  const dataToSave = `${tweetURL} ${unixTime}\n`;

  fs.appendFile(tweetsTxtPath, dataToSave, (err) => {
    if (err) throw err;
  });

  const screenshot = await createScreenshot({
    width: TWEET_WIDTH,
    theme,
    padding: TWEET_PADDING,
    tweetId: getTweetId(tweetURL),
    hideCard: TWEET_HIDE_CARD,
    hideThread: TWEET_HIDE_THREAD,
    lang,
  });

  res.send(screenshot);
});

module.exports.handler = serverless(app);
