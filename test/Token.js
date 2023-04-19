const { ethers, hre } = require("hardhat");
const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Andrew Token", "ATOK", "1000000");

    // let accounts = Token.getSigners();
    // let deployer = accounts[0];
  });

  it("Has correct name", async () => {
    //Check that name is correct
    expect(await token.name()).to.equal("Andrew Token");
  });

  it("Has correct symbol", async () => {
    //Check that symbol is correct
    expect(await token.symbol()).to.equal("ATOK");
  });
  it("Has correct decimals", async () => {
    //Check that symbol is correct
    expect(await token.decimals()).to.equal("18");
  });
  it("Has correct total supply", async () => {
    //Check that symbol is correct
    expect(await token.totalSupply()).to.equal(tokens("1000000"));
  });
});
