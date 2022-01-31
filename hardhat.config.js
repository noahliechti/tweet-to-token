require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
const { getProdSigners } = require("./scripts/helper-functions");
const { ETHERSCAN_API_KEY, REPORT_GAS, ALCHEMY_API_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

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
