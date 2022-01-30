const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const FormData = require("form-data");
const ethers = hre.ethers;
const { isLocalNetwork } = require("./helper-functions");

const { addresses } = require("../artifacts/contracts/map");
const { printEtherscanLink } = require("./helper-functions");

const PINATA_REQUEST_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

async function main() {
  const contractName = "TweetToken";
  const chainId = hre.network.config.chainId;
  const deployedContractAddress = addresses[chainId][contractName][0];
  const [, tweetOwner] = await ethers.getSigners();
  console.log(tweetOwner.address);
  const sampleTweetId = 1478285768493834240n; // using BigInt because number is too big

  printEtherscanLink(deployedContractAddress, chainId);

  const TTT = await ethers.getContractFactory(contractName);
  const ttt = await TTT.attach(deployedContractAddress);

  console.log("Sale state:", await flipSaleState(ttt));
  const tokenCount = await mintTweet(ttt, tweetOwner, sampleTweetId);

  console.log(
    "Token minted successfully! Token counter is:",
    ethers.utils.formatUnits(tokenCount, 0)
  );

  if (!isLocalNetwork()) {
    console.log(
      `View your NFT at https://testnets.opensea.io/assets/${ttt.address}/${sampleTweetId} 
    or at https://rinkeby.rarible.com/token/${ttt.address}:${sampleTweetId}`
    );
  }
}

async function mintTweet(contract, tweetOwner, tweetId) {
  let tx;
  tx = await contract.addVerifiedTweet(
    tweetOwner.address,
    tweetId,
    getTokenURIHash(tweetId)
  );
  await tx.wait();

  tx = await contract.connect(tweetOwner).mintTweet(tweetId);
  await tx.wait();

  return await contract.getTokenCount();
}

async function flipSaleState(contract) {
  let tx;
  if (!(await contract.saleIsActive())) {
    tx = await contract.flipSaleState();
    await tx.wait();
  }
  return await contract.saleIsActive();
}

async function getTokenURIHash(tweetId) {
  const basePath = path.join(__dirname, "img");
  const imageName = `${tweetId}.png`;
  const jsonName = `${tweetId}.json`;
  await uploadFileToPinata(
    imageName,
    fs.createReadStream(path.join(basePath, imageName))
  );

  return await uploadFileToPinata(
    jsonName,
    fs.createReadStream(path.join(basePath, jsonName))
  );
}

async function uploadFileToPinata(fileName, binary) {
  let fd = new FormData();
  fd.append("file", binary);

  const metadata = JSON.stringify({
    name: fileName,
    // keyvalues: { id: "" },
  });
  fd.append("pinataMetadata", metadata);

  const ipfsFilePath = await fetch(PINATA_REQUEST_URL, {
    method: "POST",
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_API_SECRET,
    },
    body: fd,
  })
    .then((res) => res.json())
    .then((json) => json.IpfsHash)
    .catch((err) => console.log(err));

  return ipfsFilePath;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
