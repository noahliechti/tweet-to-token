require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

const {
  ETHERSCAN_API_KEY,
  REPORT_GAS,
  ALCHEMY_API_KEY,
  PRIMARY_PRIVATE_KEY,
  SECONDARY_PRIVATE_KEY,
} = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach((account) => console.log(account));
});

function getProdSigners() {
  if (PRIMARY_PRIVATE_KEY) {
    if (SECONDARY_PRIVATE_KEY) {
      return [PRIMARY_PRIVATE_KEY, SECONDARY_PRIVATE_KEY];
    }
    return [PRIMARY_PRIVATE_KEY];
  }
  return [];
}

module.exports = {
  solidity: "0.8.6",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      // TODO: forking
    },
    localhost: {
      chainId: 31337,
    },
    rinkeby: {
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: getProdSigners(),
    },
  },
  gasReporter: {
    enabled: REPORT_GAS || false,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
