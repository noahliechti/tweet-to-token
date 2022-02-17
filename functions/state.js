const redis = require("redis");
const { REDIS_CONN_OBJ } = require("./utils/config");
const { getTweetId } = require("./utils/twitter");

const client = redis.createClient(REDIS_CONN_OBJ);

client.on("error", (err) => {
  // TODO: put in file (also from auth.js)
  console.log("Redis Client Error!", err);
});

exports.handler = async (event) => {
  const { tweetURL, get } = JSON.parse(event.body);
  const tweetId = getTweetId(tweetURL);

  try {
    const isPending = await new Promise((resolve) => {
      client.sismember("t:tweet:status:pending", tweetId, (err, reply) => {
        if (err) throw err;
        resolve(reply);
      });
    });

    const isMinted = await new Promise((resolve) => {
      client.sismember("t:tweet:status:minted", tweetId, (err, reply) => {
        if (err) throw err;
        resolve(reply);
      });
    });

    if (get) {
      return {
        statusCode: 200,
        body: JSON.stringify({ pending: isPending, minted: isMinted }),
      };
    }

    if (isPending) {
      if (isMinted) {
        throw new Error(
          `Tweet ${tweetId} is pending and minted at the same time!`
        );
      }

      const isMoved = await new Promise((resolve) => {
        client.smove(
          "t:tweet:status:pending",
          "t:tweet:status:minted",
          tweetId,
          (err, reply) => {
            if (err) throw err;
            resolve(reply);
          }
        );
      });
      if (!isMoved) {
        throw new Error(`Could not set state of Tweet ${tweetId} to "minted"!`);
      }
    } else {
      client.sadd("t:tweet:status:pending", tweetId);
    }

    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
