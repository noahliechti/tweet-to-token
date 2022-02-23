require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

const {
  POLYGON_SCAN,
  REPORT_GAS,
  ALCHEMY_API_KEY_POLYGON,
  PRIMARY_PRIVATE_KEY,
  SECONDARY_PRIVATE_KEY,
  COINMARKETCAP_API_KEY,
} = process.env;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  // eslint-disable-next-line no-console
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
    polygon: {
      chainId: 137,
      accounts: getProdSigners(),
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_POLYGON}`,
    },
    mumbai: {
      chainId: 80001,
      accounts: getProdSigners(),
      url: "https://rpc-mumbai.maticvigil.com",
      // url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY_MUMBAI}`,
    },
    // rinkeby: {
    //   chainId: 4,
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //   accounts: getProdSigners(),
    // },
  },
  gasReporter: {
    enabled: REPORT_GAS || false,
    currency: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: POLYGON_SCAN,
  },
};
