const express = require("express");
const session = require("express-session");
const serverless = require("serverless-http");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");

const {
  COOKIE_KEY,
  REDIS_CONN_OBJ,
  FUNCTIONS_PREFIX,
  NODE_ENV,
} = require("./utils/config");

const client = redis.createClient(REDIS_CONN_OBJ);

client.on("error", (err) => {
  console.log("Redis Client Error!", err);
});

const passport = require("./utils/passport")(client);
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load session data and make it available at `req.session`
app.use(
  session({
    name: `TTT Login${NODE_ENV === "development" ? " Dev" : ""}`,
    store: new RedisStore({ client: client, ttl: 1000 * 60 * 60 * 24 * 7 }), // 7 Days
    saveUninitialized: false,
    resave: false,
    secret: COOKIE_KEY,
    cookie: { secure: true },
  })
);

// run serializeUser on each request
app.use(passport.initialize());
// run deserializeUser on each request
app.use(passport.session());

app.use(`${FUNCTIONS_PREFIX}/auth`, authRoutes);

module.exports.handler = serverless(app);
