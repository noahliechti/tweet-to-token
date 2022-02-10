const { TWEET_SETTINGS } = require("./utils/config");
const {
  getMetadata,
  createScreenshot,
  checkTweetURL,
} = require("./utils/twitter");

const { TWEET_WIDTH, TWEET_PADDING, TWEET_HIDE_CARD, TWEET_HIDE_THREAD } =
  TWEET_SETTINGS;

exports.handler = async (event) => {
  const { language, theme, tweetURL, userId } = JSON.parse(event.body);
  let tweetClone;
  let metadata;

  try {
    await checkTweetURL(tweetURL, userId);

    tweetClone = await createScreenshot({
      width: TWEET_WIDTH,
      theme: theme,
      padding: TWEET_PADDING,
      tweetURL: tweetURL,
      hideCard: TWEET_HIDE_CARD,
      hideThread: TWEET_HIDE_THREAD,
      language: language,
    });

    metadata = await getMetadata(tweetURL, theme);
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
      metadata: metadata,
    }),
  };
};
