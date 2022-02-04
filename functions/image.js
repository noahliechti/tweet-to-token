const { TWEET_SETTINGS } = require("./utils/config");
const {
  getTweetId,
  createScreenshot,
  checkTweetURL,
} = require("./utils/twitter");

const { TWEET_WIDTH, TWEET_PADDING, TWEET_HIDE_CARD, TWEET_HIDE_THREAD } =
  TWEET_SETTINGS;

exports.handler = async (event) => {
  const { language, theme, tweetURL } = JSON.parse(event.body);

  try {
    const isValid = await checkTweetURL(tweetURL);
    if (!isValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "This Tweet doesn't belong to the specified user!",
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  try {
    const tweetClone = await createScreenshot({
      width: TWEET_WIDTH,
      theme: theme,
      padding: TWEET_PADDING,
      tweetId: getTweetId(tweetURL),
      hideCard: TWEET_HIDE_CARD,
      hideThread: TWEET_HIDE_THREAD,
      language: language,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        image: tweetClone,
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
