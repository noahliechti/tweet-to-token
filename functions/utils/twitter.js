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

const getMonthString = (utcDate) => {
  const monthNumber = new Date(utcDate).getUTCMonth() + 1;
  return Intl.DateTimeFormat("en", { month: "long" }).format(
    new Date(monthNumber.toString())
  );
};

const getAttributes = ({ data, includes }, theme, language) => [
  {
    trait_type: "attachments", // e.g 2
    value:
      data.attachments && data.attachments.media_keys
        ? data.attachments.media_keys.length
        : 0,
  },
  {
    trait_type: "polls", // e.g 1
    value:
      data.attachments && data.attachments.poll_ids
        ? data.attachments.poll_ids.length
        : 0,
  },
  {
    trait_type: "language", // e.g "en"
    value: language,
  },
  {
    trait_type: "year", // e.g "2022"
    value: `${new Date(data.created_at).getUTCFullYear()}`,
  },
  {
    trait_type: "month", // e.g "august"
    value: getMonthString(data.created_at).toLowerCase(),
  },
  {
    trait_type: "retweets", // e.g 155
    value: data.public_metrics.retweet_count,
  },
  {
    trait_type: "replies", // e.g 66
    value: data.public_metrics.reply_count,
  },
  {
    trait_type: "likes", // e.g 401
    value: data.public_metrics.like_count,
  },
  {
    trait_type: "quotes", // e.g 45
    value: data.public_metrics.quote_count,
  },
  {
    trait_type: "theme", // e.g "light" or "dark"
    value: theme,
  },
  {
    trait_type: "verified", // e.g "yes" or "no"
    value: includes.users.verified ? "yes" : "no",
  },
  {
    trait_type: "username", // e.g SuperDuper2000
    value: includes.users[0].username,
  },
  {
    trait_type: "user id", // e.g 177101260
    value: includes.users[0].id,
  },
  {
    trait_type: "characters", // e.g 120
    value: data.text.length,
  },
];

exports.getMetadata = async (tweetURL, theme, language) => {
  const tweetId = getTweetId(tweetURL);
  const api = `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=attachments,created_at,lang,text,public_metrics&user.fields=verified&expansions=author_id`;
  const headers = {
    Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  };

  return new Promise((resolve, reject) => {
    fetch(api, { method: "GET", headers: headers })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for res.statusCode === 200?
        if (res.errors) {
          throw new Error(res.errors[0].detail);
        } else {
          const { username } = res.includes.users[0];
          const attributes = getAttributes(res, theme, language);

          const metadata = {
            name: `@${username} #${tweetId}`,
            description: `Tweet by @${username}.\nOriginal: ${tweetURL}`,
            attributes: attributes,
          };
          resolve(metadata);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.createScreenshot = async ({
  language,
  width,
  theme,
  padding,
  hideCard,
  hideThread,
  tweetURL,
}) => {
  const tweetId = getTweetId(tweetURL);

  try {
    const browser = await puppeteer.launch({
      // args: chromium.args, // https://github.com/alixaxel/chrome-aws-lambda/blob/master/source/index.ts
      // --use-gl=swiftshader -> Throws Navigation failed because browser has disconnected!
      executablePath: CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--single-process"],
    });

    const page = await browser.newPage();
    await page.goto(
      `https://platform.twitter.com/embed/index.html?dnt=true&embedId=twitter-widget-0&frame=false&hideCard=${hideCard}&hideThread=${hideThread}&id=${tweetId}&lang=${language}&theme=${theme}&widgetsVersion=ed20a2b%3A1601588405575`,
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
    const msg = "Could not clone the Tweet!";
    console.log(msg, err);
    throw new Error(msg);
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
            throw new Error("This Tweet doesn't seem to exist!");
          }
          throw new Error(res.errors[0].detail);
        } else {
          // Users should only be able to mint their own tweets
          if (twitterUserId === res.data.author_id) {
            if (tweetAuthorName === res.includes.users[0].username) {
              resolve();
            } else {
              throw new Error(
                "This Tweet doesn't belong to the specified user!"
              );
            }
          }
          throw new Error("You are not the author of this tweet!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
