const express = require("express");
const session = require("express-session");
const serverless = require("serverless-http");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const { COOKIE_KEY, MONGO_URL, FUNCTIONS_PREFIX } = require("./utils/config");

require("./utils/passport");
require("./utils/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load session data and make it available at `req.session`
app.use(
  session({
    name: "TTT Session",
    secret: COOKIE_KEY,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL, // TODO: use redis or serverless mongodb link
    }),
    cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 90 }, // 90 Days
  })
);

// initialize passport and authenticate the request based on session
// data.
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(`${FUNCTIONS_PREFIX}/auth`, authRoutes);

module.exports.handler = serverless(app);
