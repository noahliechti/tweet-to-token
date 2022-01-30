const hre = require("hardhat");
const { storeContractAddress } = require("./helper-function");

async function main() {
  const ethers = hre.ethers;

  const contractName = "TweetToken";
  const TTT = await ethers.getContractFactory(contractName);
  const ttt = await TTT.deploy("https://gateway.pinata.cloud/ipfs/");

  await ttt.deployed();
  storeContractAddress(ttt, contractName);

  console.log("Deployer:", (await ethers.getSigners())[0].address);
  console.log("TweetToken deployed to:", ttt.address);

  // TODO: publish source
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
