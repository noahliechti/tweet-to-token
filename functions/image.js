const { TWEET_SETTINGS } = require("./utils/config");
const { getTweetId, createScreenshot } = require("./utils/screenshot");

const { TWEET_WIDTH, TWEET_PADDING, TWEET_HIDE_CARD, TWEET_HIDE_THREAD } =
  TWEET_SETTINGS;

exports.handler = async (event) => {
  const { language, theme, tweetURL } = JSON.parse(event.body);

  const screenshot = await createScreenshot({
    width: TWEET_WIDTH,
    theme: theme,
    padding: TWEET_PADDING,
    tweetId: getTweetId(tweetURL),
    tweetURL: tweetURL,
    hideCard: TWEET_HIDE_CARD,
    hideThread: TWEET_HIDE_THREAD,
    language: language,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      image: screenshot,
    }),
  };
};
