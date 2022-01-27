exports.BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://tweet-token.netlify.app";

exports.FUNCTIONS_PREFIX = "/.netlify/functions";
exports.COOKIE_KEY = process.env.COOKIE_KEY || "SUPERSECRET";

exports.TWITTER_CONSUMER_KEY =
  process.env.NODE_ENV === "development"
    ? process.env.TWITTER_CONSUMER_KEY_DEV
    : process.env.TWITTER_CONSUMER_KEY;

exports.TWITTER_CONSUMER_SECRET =
  process.env.NODE_ENV === "development"
    ? process.env.TWITTER_CONSUMER_SECRET_DEV
    : process.env.TWITTER_CONSUMER_SECRET;

exports.MONGO_URL =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost/userDB"
    : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@users.s9tkz.mongodb.net/UserDB?retryWrites=true&w=majority`;

exports.TWEET_SETTINGS = {
  TWEET_WIDTH: 1000,
  TWEET_PADDING: 25,
  TWEET_HIDE_THREAD: true,
  TWEET_HIDE_CARD: false,
};