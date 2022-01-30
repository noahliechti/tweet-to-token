const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "artifacts/contracts/map.js");

exports.storeContractAddress = async (contract, contractName) => {
  const { address, deployTransaction } = contract;
  const { chainId } = deployTransaction;

  fs.stat(filePath, (err) => {
    if (err == null) {
      // File exists
      let { addresses } = require("../artifacts/contracts/map");

      if (!addresses[chainId]) {
        // Network does not exist yet
        addresses[chainId] = {
          [contractName]: [address],
        };
        writeFile(addresses);
      } else if (!addresses[chainId][contractName]) {
        // Network exists but contract does not
        addresses[chainId][contractName] = [address];
        writeFile(addresses);
      } else if (addresses[chainId][contractName][0] !== address) {
        // Network and contract exist but address does not
        addresses[chainId][contractName].unshift(address);
        writeFile(addresses);
      }
    } else if (err.code === "ENOENT") {
      // File does not exist
      const addresses = {
        [chainId]: {
          [contractName]: [address],
        },
      };
      writeFile(addresses);
    } else {
      console.log("Some other error: ", err.code);
    }
  });
  return contract.address;
};

function writeFile(addresses) {
  fs.writeFile(
    filePath,
    `exports.addresses = ${JSON.stringify(addresses)};`,
    (err) => {
      if (err) console.log(err);
    }
  );
}

exports.printEtherscanLink = (contractAddress, chainId) => {
  const link;
  if (chainId === 1) {
    link = "https://etherscan.io/address/"
  } else if (chainId === 4) {
    link = "https://rinkeby.etherscan.io/address/"
  }
  console.log(
    `Using deployed contract ${contractAddress} available on ${link}${contractAddress}`
  );
}