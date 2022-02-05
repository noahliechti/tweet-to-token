const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const fetch = require("node-fetch");

const { CHROME_EXECUTABLE_PATH, TWITTER_BEARER_TOKEN } = require("./config");

const getTweetId = (tweetURL) => {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
};

exports.getTweetId = getTweetId;

const getTweetAuthorName = (tweetURL) => {
  const splitTweetURL = tweetURL.split("/");
  const thirdLastItem = splitTweetURL[splitTweetURL.length - 3];
  return thirdLastItem;
};

exports.getTweetAuthorName = this.getTweetAuthorName;

exports.createScreenshot = async ({
  language,
  width,
  theme,
  padding,
  hideCard,
  hideThread,
  tweetId,
}) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(
      `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=${hideCard}&hideThread=${hideThread}&id=${tweetId}&language=${language}&theme=${theme}&widgetsVersion=ed20a2b%3A1601588405575`,
      { waitUntil: "networkidle0" }
    );

    const embedDefaultWidth = 550;
    const percent = width / embedDefaultWidth;
    const pageWidth = embedDefaultWidth * percent;
    const pageHeight = 100;
    await page.setViewport({ width: pageWidth, height: pageHeight });

    await page.evaluate(
      (props) => {
        const style = document.createElement("style");
        style.innerHTML =
          "* { font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important; }";
        document.getElementsByTagName("head")[0].appendChild(style);

        const body = document.querySelector("body");
        body.style.padding = `${props.padding}px`;
        body.style.backgroundColor = props.theme === "dark" ? "#000" : "#fff";
        body.style.zoom = `${100 * props.percent}%`;
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
    return imageBuffer;
  } catch (err) {
    const msg = "Error when cloning the Tweet";
    console.log(msg, err);
    return new Error(msg);
  }
};

exports.checkTweetURL = (tweetURL, twitterUserId) => {
  const tweetId = getTweetId(tweetURL);
  const tweetAuthorName = getTweetAuthorName(tweetURL);

  const api = `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id`;
  const headers = {
    Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  };

  return new Promise((resolve, reject) => {
    fetch(api, { method: "GET", headers: headers })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for res.statusCode === 200?
        if (res.errors) {
          if (res.errors[0].title === "Not Found Error") {
            reject(new Error("This Tweet doesn't seem to exist!"));
          }
          reject(new Error(res.errors[0].detail));
        } else {
          // Users should only be able to mint their own tweets
          if (twitterUserId === res.data.author_id) {
            resolve(tweetAuthorName === res.includes.users[0].username);
          }
          reject(new Error("You are not the author of this tweet!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
