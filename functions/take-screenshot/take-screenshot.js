const chromium = require("chrome-aws-lambda");

const TWEET_WIDTH = 1000;
const TWEET_PADDING = 25;
const TWEET_HIDE_THREAD = true;
const TWEET_HIDE_CARD = false;

exports.handler = async (event, context) => {
  const { tweetURL, theme, lang } = JSON.parse(event.body);

  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();
  await page.goto(
    `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=${TWEET_HIDE_CARD}&hideThread=${TWEET_HIDE_THREAD}&id=${getTweetId(
      tweetURL
    )}&lang=${lang}&theme=${theme}&widgetsVersion=ed20a2b%3A1601588405575`,
    { waitUntil: "networkidle0" }
  );

  const embedDefaultWidth = 550;
  const percent = TWEET_WIDTH / embedDefaultWidth;
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

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot`,
      buffer: imageBuffer,
    }),
  };
};

function getTweetId(tweetURL) {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
}
