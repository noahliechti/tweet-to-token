const router = require("express").Router();
const puppeteer = require("puppeteer");

// send profile data if user is logged in
router.get("/", (req, res) => {
  res.status(200).json({ user: req.user });
});

const TWEET_WIDTH = 1000;
const TWEET_PADDING = 25;
const TWEET_HIDE_THREAD = true;
const TWEET_HIDE_CARD = false;

router.get("/get-image", async (req, res) => {
  // req.params, req.query, req.body
  const { tweetURL, theme, language } = req.query;

  const screenshot = await createScreenshot({
    width: TWEET_WIDTH,
    theme,
    padding: TWEET_PADDING,
    tweetId: getTweetId(tweetURL),
    hideCard: TWEET_HIDE_CARD,
    hideThread: TWEET_HIDE_THREAD,
    language,
  });

  res.send({ image: screenshot });
});

const createScreenshot = async (props) => {
  try {
    const { language, width, theme, padding, hideCard, hideThread, tweetId } =
      props;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
    console.log("My error", err);
    // next();
  }
};

function getTweetId(tweetURL) {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
}

module.exports = router;
