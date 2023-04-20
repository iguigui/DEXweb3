const { ethers, hre } = require("hardhat");
const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

let token, accounts, deployer;

beforeEach(async () => {
  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy("Andrew Token", "ATOK", "1000000");

  accounts = await ethers.getSigners();
  deployer = accounts[0];
});

describe("Deployment", () => {
  const name = "Andrew Token";
  const symbol = "ATOK";
  const decimals = "18";
  const totalSupply = tokens("1000000");

  it("Has correct name", async () => {
    //Check that name is correct
    expect(await token.name()).to.equal(name);
  });

  it("Has correct symbol", async () => {
    //Check that symbol is correct
    expect(await token.symbol()).to.equal(symbol);
  });
  it("Has correct decimals", async () => {
    //Check that symbol is correct
    expect(await token.decimals()).to.equal(decimals);
  });
  it("Has correct total supply", async () => {
    //Check that symbol is correct
    expect(await token.totalSupply()).to.equal(totalSupply);
  });
  it("assigns total supply to deployer", async () => {
    console.log(deployer.address);
    expect(await token.balanceOf(deployer.address)).to.equal(
      await token.totalSupply()
    );
  });
});
