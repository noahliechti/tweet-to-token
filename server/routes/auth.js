const router = require("express").Router();
const passport = require("passport");
const globals = require("../config/globals");

const CLIENT_HOME_PAGE_URL = `http://localhost:${globals.clientPort}`;

// send profile data if user is logged in
router.get("/", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  // req.session.destroy(); // delete session from db after logout
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get("/login", passport.authenticate("twitter"));

router.get(
  "/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: CLIENT_HOME_PAGE_URL,
  })
);

module.exports = router;
