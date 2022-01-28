const { expect } = require("chai");
const { ethers } = require("hardhat");

const BASE_URI = "https://gateway.pinata.cloud/ipfs/";

async function deployContract() {
  const TTT = await ethers.getContractFactory("TweetToken");
  const ttt = await TTT.deploy(BASE_URI);
  return await ttt.deployed();
}

describe("TweetToken", async function () {
  it("Should return the initial state of the deployed contract", async function () {
    const ttt = await deployContract();
    expect(await ttt.baseURI()).to.equal(BASE_URI);
    expect(await ttt.saleIsActive()).to.equal(false);
  });

  it("Should update the baseURI", async function () {
    const ttt = await deployContract();
    const baseURI = await ttt.setBaseURI(BASE_URI + "update/");
    await baseURI.wait();
    expect(await ttt.baseURI()).to.equal(BASE_URI + "update/");
  });

  it("Should flip sale state", async function () {
    const ttt = await deployContract();
    const saleState = await ttt.flipSaleState();
    await saleState.wait();
    expect(await ttt.saleIsActive()).to.equal(true);
  });
});
