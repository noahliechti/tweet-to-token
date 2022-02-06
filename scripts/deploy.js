const hre = require("hardhat");
const {
  storeContractAddress,
  verifyContract,
  printEtherscanLink,
} = require("./helper-functions");

const { ethers, network } = hre;

async function main() {
  const { chainId } = network.config;
  const contractName = "TweetToken";
  const args = ["ipfs://"];

  const TTT = await ethers.getContractFactory(contractName);
  const ttt = await TTT.deploy(...args);

  await ttt.deployed();
  await storeContractAddress(ttt, contractName);
  await verifyContract(ttt, args);

  console.log("Deployer:", (await ethers.getSigners())[0].address);
  console.log(`${contractName} deployed to:`, ttt.address);

  printEtherscanLink(ttt.address, chainId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
