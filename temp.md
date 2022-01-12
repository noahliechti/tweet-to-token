```javascript
const HEADERS = {
  Authorization: "Bearer " + process.env.BEARER_TOKEN,
};
function getTweetId(tweetURL) {
  const splitTweetURL = tweetURL.split("/");
  const lastItem = splitTweetURL[splitTweetURL.length - 1];
  const splitLastItem = lastItem.split("?");
  return splitLastItem[0];
}
app.get("/get-data", async (req, res) => {
  const tweetId = getTweetId(req.query.tweetURL);
  var config = {
    method: "get",
    // TODO: what attributes do I need?, should I do it directly in js?
    url: `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=created_at,attachments&expansions=author_id`,
    headers: HEADERS,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
```
