const { TWEET_SETTINGS } = require("./utils/config");
const {
  getTweetId,
  createScreenshot,
  checkTweetURL,
} = require("./utils/twitter");

const { TWEET_WIDTH, TWEET_PADDING, TWEET_HIDE_CARD, TWEET_HIDE_THREAD } =
  TWEET_SETTINGS;

exports.handler = async (event) => {
  const { language, theme, tweetURL, userId } = JSON.parse(event.body);
  let tweetClone;

  try {
    const isValid = await checkTweetURL(tweetURL, userId);
    if (!isValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "This Tweet doesn't belong to the specified user!",
        }),
      };
    }
    tweetClone = await createScreenshot({
      width: TWEET_WIDTH,
      theme: theme,
      padding: TWEET_PADDING,
      tweetId: getTweetId(tweetURL),
      hideCard: TWEET_HIDE_CARD,
      hideThread: TWEET_HIDE_THREAD,
      language: language,
    });
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      image: tweetClone,
    }),
  };
};
