const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

const {
  BASE_URL,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  FUNCTIONS_PREFIX,
} = require("./config");

module.exports = (client) => {
  // save user.userId to req.session.passport.user = '..' if a user is found in db
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  // save additional user data (with matching id) in req.user
  passport.deserializeUser((userId, done) => {
    client.hgetall(`t:user:${userId}`, (err, user) => {
      if (err) throw err;
      if (user) {
        const userEnhanced = user;
        userEnhanced.verified = userEnhanced.verified === "true"; // convert string to bool
        userEnhanced.userId = userId;
        done(null, userEnhanced); // attach user object to the request as req.user
      } else {
        done(new Error("Failed to deserialize user"));
      }
    });
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: `${BASE_URL}${FUNCTIONS_PREFIX}/auth/redirect`,
      },
      async (token, tokenSecret, profile, done) => {
        const {
          id_str: userId,
          name,
          screen_name: screenName,
          profile_image_url: photo,
          verified,
        } = profile._json; // eslint-disable-line no-underscore-dangle

        // TODO: its already in the username
        const user = { name, screenName, photo, verified };

        // create or overwrite user in db
        await client.hmset(`t:user:${userId}`, user);

        done(null, user);
      }
    )
  );
  return passport;
};
