const FormData = require("form-data");
const fetch = require("node-fetch");
const { Readable } = require("stream");

const { getTweetId } = require("./utils/twitter");

async function uploadToPinata(pinataContent, fileName, isJSON = false) {
  const fd = new FormData();
  let imgBuffer;
  let readable;

  if (!isJSON) {
    imgBuffer = Buffer.from(pinataContent, "base64");
    readable = Readable.from(imgBuffer);
    fd.append("file", readable, fileName);
  } else {
    fd.append("file", JSON.stringify(pinataContent), fileName);
  }

  fd.append(
    "pinataMetadata",
    JSON.stringify({
      keyvalues: {
        // env: "dev", // TODO: should I make folders?
        date: new Date().toISOString(),
      },
    })
  );

  return fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_API_SECRET,
    },
    body: fd,
  })
    .then((res) => res.json())
    .then((json) => json.IpfsHash)
    .catch((err) => err);
}

exports.handler = async (event) => {
  const { metadata, imageData, tweetURL } = JSON.parse(event.body);
  const tweetId = getTweetId(tweetURL);
  let tokenURI;

  try {
    const ipfsImagePath = await uploadToPinata(
      imageData,
      `${tweetId}.png`,
      false
    );

    const metadata2 = {
      name: "#1 from @Rainmaker1973",
      description:
        "Tweet by @Rainmaker1973 tweeted on 21.12.21. Original: https://twitter.com/Rainmaker1973/status/1478285768493834240",
      image: ipfsImagePath,
      attributes: [
        { trait_type: "likes", value: 50 },
        { trait_type: "retweets", value: 13 },
        { trait_type: "comments", value: 3 },
        { trait_type: "language", value: "en" },
      ],
    };

    metadata.image = ipfsImagePath;
    // console.log(metadata);

    tokenURI = await uploadToPinata(metadata2, `${tweetId}.json`, true);
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Could not upload to Pinata",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      tokenURI: tokenURI,
    }),
  };
};