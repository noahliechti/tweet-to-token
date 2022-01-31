require("dotenv").config();

const fs = require("fs");
const path = require("path");

const fileName = "map.js";
const relativeDirPath = path.join("..", "src", "config", "contracts");
const absoluteDirPath = path.join(__dirname, relativeDirPath);
const relativeFilePath = path.join(relativeDirPath, fileName);
const absoluteFilePath = path.join(__dirname, relativeFilePath);

exports.storeContractAddress = async (contract, contractName) => {
  const { address, deployTransaction } = contract;
  const { chainId } = deployTransaction;

  // console.log(await artifacts.readArtifactSync(contractName));
  fs.stat(absoluteDirPath, (err) => {
    // Directory exists
    if (err == null) {
      createAndWritePersistentContractFiles(chainId, contractName, address);
    } else if (err.code === "ENOENT") {
      // Directory does not exist
      fs.mkdir(absoluteDirPath, (err) => {
        if (err) {
          console.error(`Error creating directory ${absoluteFilePath}:`, err);
        } else {
          createAndWritePersistentContractFiles(chainId, contractName, address);
        }
      });
    } else {
      console.error(
        `Error returning information about directory ${absoluteDirPath}:`,
        err
      );
    }
  });
  return contract.address;
};

function createAndWritePersistentContractFiles(chainId, contractName, address) {
  fs.stat(absoluteFilePath, (err) => {
    if (err == null) {
      // File exists
      let { addresses } = require(relativeFilePath);
      addresses[chainId] = {
        [contractName]: address,
      };
      writeFile(addresses);
    } else if (err.code === "ENOENT") {
      // File does not exist
      const addresses = {
        [chainId]: {
          [contractName]: address,
        },
      };
      writeFile(addresses);
    } else {
      console.error(`Error return information about ${absoluteFilePath}:`, err);
    }
  });
}

function writeFile(addresses) {
  fs.writeFile(
    absoluteFilePath,
    `exports.addresses = ${JSON.stringify(addresses, undefined, 2)};`,
    (err) => {
      if (err)
        console.error(`Error writing the file ${absoluteFilePath}:`, err);
    }
  );
}

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

exports.getProdSigners = () => {
  const { PRIMARY_PRIVATE_KEY, SECONDARY_PRIVATE_KEY } = process.env;

  return PRIMARY_PRIVATE_KEY
    ? SECONDARY_PRIVATE_KEY
      ? [PRIMARY_PRIVATE_KEY, SECONDARY_PRIVATE_KEY]
      : [PRIMARY_PRIVATE_KEY]
    : [];
};

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
