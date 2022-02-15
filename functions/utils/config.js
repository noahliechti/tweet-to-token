exports.BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://tweettoken.io";

exports.FUNCTIONS_PREFIX = "/.netlify/functions";
exports.COOKIE_KEY = process.env.COOKIE_KEY;

exports.TWITTER_CONSUMER_KEY =
  process.env.NODE_ENV === "development"
    ? process.env.TWITTER_CONSUMER_KEY_DEV
    : process.env.TWITTER_CONSUMER_KEY;

exports.TWITTER_CONSUMER_SECRET =
  process.env.NODE_ENV === "development"
    ? process.env.TWITTER_CONSUMER_SECRET_DEV
    : process.env.TWITTER_CONSUMER_SECRET;

exports.TWITTER_BEARER_TOKEN =
  process.env.NODE_ENV === "development"
    ? process.env.TWITTER_BEARER_TOKEN_DEV
    : process.env.TWITTER_BEARER_TOKEN;

exports.CHROME_EXECUTABLE_PATH =
  process.env.NODE_ENV === "development"
    ? process.env.CHROME_EXECUTABLE_PATH
    : null;

// redis[s]://[[username][:password]@][host][:port][/db-number]
exports.REDIS_CONN_OBJ =
  process.env.NODE_ENV === "development"
    ? { host: "127.0.0.1", port: 6379 }
    : {
        url: `redis://default:${process.env.REDIS_PW}@redis-16429.c274.us-east-1-3.ec2.cloud.redislabs.com:16429`,
      };

exports.TWEET_SETTINGS = {
  TWEET_WIDTH: 1000,
  TWEET_PADDING: 25,
  TWEET_HIDE_THREAD: true,
  TWEET_HIDE_CARD: false,
};
