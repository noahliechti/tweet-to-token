const redis = require("redis");
const { REDIS_CONN_OBJ } = require("./utils/config");
const { getTweetId } = require("./utils/twitter");

const client = redis.createClient(REDIS_CONN_OBJ);

client.on("error", (err) => {
  // TODO: put in file (also from auth.js)
  console.log("Redis Client Error!", err);
});

exports.handler = async (event) => {
  const { metadata, image, tweetURL, language, theme } = JSON.parse(event.body);
  const tweetId = getTweetId(tweetURL);

  try {
    if (metadata && image && tweetId && language && theme) {
      // cache data for 10 minutes
      const tweet = { metadata: JSON.stringify(metadata), image: image };
      await client.hmset(
        `t:tweet:${tweetId}:${language}:${theme}`,
        tweet,
        (err) => {
          if (err) throw err;
        }
      );
      await client.expire(`t:tweet:${tweetId}:${language}:${theme}`, 60 * 10);

      return {
        statusCode: 200,
      };
    }
    if ((!metadata || !image) && tweetId && language && theme) {
      // get cached data
      const res = await new Promise((resolve) => {
        client.hgetall(
          `t:tweet:${tweetId}:${language}:${theme}`,
          (err, tweet) => {
            if (err) throw err;
            if (tweet) {
              resolve(
                JSON.stringify({
                  image: tweet.image,
                  metadata: JSON.parse(tweet.metadata),
                })
              );
            }
            resolve(
              JSON.stringify({
                image: null,
                metadata: null,
              })
            );
          }
        );
      });
      return {
        statusCode: 200,
        body: res,
      };
    }
    throw new Error(`No valid arguments were passed!`);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
