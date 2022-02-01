const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const { CHROME_EXECUTABLE_PATH } = require("./config");

exports.createScreenshot = async ({
  language,
  width,
  theme,
  padding,
  hideCard,
  hideThread,
  tweetId,
  tweetURL,
}) => {
  let imageBuffer;

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
      () => {
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

    imageBuffer = await page.screenshot({
      type: "png",
      fullPage: true,
      encoding: "base64",
    });

    await browser.close();
  } catch (err) {
    console.log(
      `Error when creating the image of the tweet. Check if ${tweetURL} is a valid tweet url`,
      err
    );
  }
  return imageBuffer;
};

exports.getTweetId = (tweetURL) => {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
};
