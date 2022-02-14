const router = require("express").Router();
const passport = require("passport");
const { BASE_URL } = require("../utils/config");

router.get("/", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${BASE_URL}/#steps`);
});

router.get("/login", passport.authenticate("twitter"));

router.get(
  "/redirect",
  passport.authenticate("twitter", {
    successRedirect: `${BASE_URL}/#steps`,
    failureRedirect: `${BASE_URL}/#steps`,
  })
);

module.exports = router;
