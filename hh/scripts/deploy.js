const hre = require("hardhat");
const { storeContractAddress, verifyContract } = require("./helper-functions");

async function main() {
  const ethers = hre.ethers;
  const contractName = "TweetToken";
  const args = ["https://gateway.pinata.cloud/ipfs/"];

  const TTT = await ethers.getContractFactory(contractName);
  const ttt = await TTT.deploy(...args);

  await ttt.deployed();
  await storeContractAddress(ttt, contractName);
  await verifyContract(ttt, args);

  console.log("Deployer:", (await ethers.getSigners())[0].address);
  console.log("TweetToken deployed to:", ttt.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
