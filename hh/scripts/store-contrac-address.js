const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "artifacts/contracts/map.js");

exports.storeContractAddress = async (contract, contractName) => {
  const { address, deployTransaction } = contract;
  const { chainId } = deployTransaction;

  fs.stat(filePath, (err) => {
    if (err == null) {
      // File exists
      const { addresses } = require("../artifacts/contracts/map");

      let rawData = fs.readFileSync(filePath, "utf8");

      let json = JSON.parse(rawData);

      if (!json[chainId]) {
        // Network does not exist yet
        json[chainId] = {
          [contractName]: [address],
        };
        writeFile(json);
      } else if (!json[chainId][contractName]) {
        // Network exists but contract does not
        json[chainId][contractName] = [address];
        writeFile(json);
      } else if (json[chainId][contractName][0] !== address) {
        // Network and contract exist but address does not
        json[chainId][contractName].unshift(address);
        writeFile(json);
      }
    } else if (err.code === "ENOENT") {
      // File does not exist
      const json = {
        [chainId]: {
          [contractName]: [address],
        },
      };
      writeFile(json);
      // fs.writeFile(
      //   filePath,
      //   `exports.addresses = ${JSON.stringify(json)};`,
      //   (err) => {
      //     if (err) console.log(err);
      //   }
      // );
    } else {
      console.log("Some other error: ", err.code);
    }
  });
  return contract.address;
};

function writeFile(json) {
  fs.writeFile(filePath, JSON.stringify(json), (err) => {
    if (err) console.log(err);
  });
}
