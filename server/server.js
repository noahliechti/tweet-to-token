require("dotenv").config();
const fs = require("fs");
const path = require("path");
const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const puppeteer = require("puppeteer");

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

// const cors = require("cors");
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:1234", "http://localhost:1234"],
//   })
// );

app.use(express.static(path.join(__dirname, "..", "dist")));

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

const createScreenshot = async (props) => {
  try {
    const { lang, width, theme, padding, hideCard, hideThread, tweetId } =
      props;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(
      `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=${hideCard}&hideThread=${hideThread}&id=${tweetId}&lang=${lang}&theme=${theme}&widgetsVersion=ed20a2b%3A1601588405575`,
      { waitUntil: "networkidle0" }
    );

    const embedDefaultWidth = 550;
    const percent = width / embedDefaultWidth;
    const pageWidth = embedDefaultWidth * percent;
    const pageHeight = 100;
    await page.setViewport({ width: pageWidth, height: pageHeight });

    await page.evaluate(
      (props) => {
        const { theme, padding, percent } = props;

        const style = document.createElement("style");
        style.innerHTML =
          "* { font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important; }";
        document.getElementsByTagName("head")[0].appendChild(style);

        const body = document.querySelector("body");
        body.style.padding = `${padding}px`;
        body.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
        body.style.zoom = `${100 * percent}%`;
        const articleWrapper = document.querySelector("#app > div");
        articleWrapper.style.border = "none";
      },
      { theme, padding, percent }
    );

    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: true,
      encoding: "base64",
    });

    await browser.close();

    console.log(imageBuffer);

    return imageBuffer;
  } catch (err) {
    console.log(err);
  }
};

if (process.env.NODE_ENV === "DEV") {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${HOST}:${PORT}`);
  });
} else {
  module.exports.handler = serverless(app);
}
