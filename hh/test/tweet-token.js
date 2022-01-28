const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TweetToken", function () {
  it("Should return the initial state of the deployed contract", async function () {
    const baseURI = "https://gateway.pinata.cloud/ipfs/";

    const TTT = await ethers.getContractFactory("TweetToken");
    const ttt = await TTT.deploy(baseURI);
    await ttt.deployed();

    expect(await ttt.baseURI()).to.equal(baseURI);
    expect(await ttt.saleIsActive()).to.equal(false);
  });

  // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  // greeter.balanceOf(recipient)

  // // wait until the transaction is mined
  // await setGreetingTx.wait();

  // expect(await greeter.greet()).to.equal("Hola, mundo!");
});
