require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const globals = require("./config/globals");

require("./config/passport");
require("./config/database");

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load session data and make it available at `req.session`
app.use(
  session({
    name: "test",
    secret: process.env.COOKIE_KEY,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.NODE_ENV === "development"
          ? globals.devMongoURL
          : globals.prodMongoURL,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 90 },
  })
);

// initialize passport and authenticate the request based on session
// data.
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(
  cors({
    origin: `http://localhost:${globals.clientPort}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
