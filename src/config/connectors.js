import { InjectedConnector } from "@web3-react/injected-connector";

// eslint-disable-next-line import/prefer-default-export
export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 31337],
  // Mainnet, Rinkeby, Testnet // TODO: polygon, mumbai, testnet
});
