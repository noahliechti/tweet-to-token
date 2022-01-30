const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TweetToken Contract", function () {
  const BASE_URI = "https://gateway.pinata.cloud/ipfs/";
  const INITIAL_SALE_STATE = false;
  let ttt;
  let owner;
  let addr1;

  beforeEach(async function () {
    const TTT = await ethers.getContractFactory("TweetToken");
    ttt = await TTT.deploy(BASE_URI);
    // owner is the first element from the array of signers; first signer is per default the deployer
    [owner, addr1] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await ttt.owner()).to.equal(owner.address);
    });

    it("Should return the initial state of the deployed contract", async function () {
      expect(await ttt.baseURI()).to.equal(BASE_URI);
      expect(await ttt.saleIsActive()).to.equal(INITIAL_SALE_STATE);
      expect(await ttt.getTokenCount()).to.equal(0);
    });
  });

  it("Should update the baseURI", async function () {
    const baseURI = await ttt.setBaseURI(BASE_URI + "update/");
    await baseURI.wait();
    expect(await ttt.baseURI()).to.equal(BASE_URI + "update/");
  });

  it("Should flip sale state", async function () {
    const saleState = await ttt.flipSaleState();
    await saleState.wait();
    expect(await ttt.saleIsActive()).to.equal(!INITIAL_SALE_STATE);
  });

  it("Should not allow non-owners to flip sale state", async function () {
    // don't use await here
    expect(ttt.connect(addr1).flipSaleState()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
    expect(await ttt.saleIsActive()).to.equal(INITIAL_SALE_STATE);
  });
});
