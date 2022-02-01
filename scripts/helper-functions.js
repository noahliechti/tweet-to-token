const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

const fileName = "map.js";
const relativeDirPath = path.join("..", "src", "config", "contracts");
const absoluteDirPath = path.join(__dirname, relativeDirPath);
const relativeFilePath = path.join(relativeDirPath, fileName);
const absoluteFilePath = path.join(__dirname, relativeFilePath);

const { artifacts } = hre;

function writeContractAddressFile(addresses) {
  fs.writeFile(
    absoluteFilePath,
    `export default ${JSON.stringify(addresses, undefined, 2)};`,
    (err) => {
      if (err)
        console.error(`Error writing the file ${absoluteFilePath}:`, err);
    }
  );
}

function createAndWritePersistentContractFiles(chainId, contractName, address) {
  const absoluteArtifactPath = `${absoluteDirPath}/${contractName}.json`;
  fs.writeFile(
    absoluteArtifactPath,
    JSON.stringify(artifacts.readArtifactSync(contractName), null, 2),
    (err) => {
      if (err)
        console.error(`Error writing the file ${absoluteArtifactPath}:`, err);
    }
  );

  fs.stat(absoluteFilePath, (err) => {
    if (err == null) {
      // File exists
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const addresses = require(relativeFilePath);
      addresses[chainId] = {
        [contractName]: address,
      };
      writeContractAddressFile(addresses);
    } else if (err.code === "ENOENT") {
      // File does not exist
      const addresses = {
        [chainId]: {
          [contractName]: address,
        },
      };
      writeContractAddressFile(addresses);
    } else {
      console.error(`Error return information about ${absoluteFilePath}:`, err);
    }
  });
}
function createContractDirectory(chainId, contractName, address) {
  fs.mkdir(absoluteDirPath, (err) => {
    if (err) {
      console.error(`Error creating directory ${absoluteFilePath}:`, err);
    } else {
      createAndWritePersistentContractFiles(chainId, contractName, address);
    }
  });
}
exports.storeContractAddress = async (contract, contractName) => {
  const { address, deployTransaction } = contract;
  const { chainId } = deployTransaction;

  fs.stat(absoluteDirPath, (err) => {
    if (err == null) {
      // Directory exists
      createAndWritePersistentContractFiles(chainId, contractName, address);
    } else if (err.code === "ENOENT") {
      // Directory does not exist
      createContractDirectory(chainId, contractName, address);
    } else {
      console.error(
        `Error returning information about directory ${absoluteDirPath}:`,
        err
      );
    }
  });
  return contract.address;
};

exports.printEtherscanLink = (contractAddress, chainId) => {
  let link;
  switch (chainId) {
    case 1:
      link = "https://etherscan.io/address/";
      break;
    case 4:
      link = "https://rinkeby.etherscan.io/address/";
      break;
    case 1337:
      return;
    default:
      return;
  }
  console.log(`Inspect deployed contract on ${link}${contractAddress}`);
};

const isLocalNetwork = () => hre.network.config.chainId === 31337;
exports.isLocalNetwork = isLocalNetwork;

exports.logMarketplaceURL = (contract, id) => {
  console.log(
    `View your NFT at https://testnets.opensea.io/assets/${contract.address}/${id} 
    or at https://rinkeby.rarible.com/token/${contract.address}:${id}`
  );
};

exports.verifyContract = async (contract, args) => {
  const { address } = contract;
  if (isLocalNetwork() || !hre.config.etherscan.apiKey) {
    return; // contract is deployed on local network or no apiKey is configured
  }
  console.log("Waiting 5 block confirmations...");
  await contract.deployTransaction.wait(5); // needed if verifyContract() is called immediately after deployment
  try {
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
  } catch (err) {
    if (err.message.includes("Reason: Already Verified")) {
      console.log("Contract is already verified!");
    }
  }
};
