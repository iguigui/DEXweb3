const { ethers, hre } = require("hardhat");
const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  let token, accounts, deployer;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Andrew Token", "ATOK", "1000000");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
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
      expect(await token.balanceOf(deployer.address)).to.equal(
        await token.totalSupply()
      );
    });
  });

  describe("Sending Tokens", () => {
    let amount, transaction, result;

    beforeEach(async () => {
      amount = tokens(100);
      transaction = await token
        .connect(deployer)
        .transfer(receiver.address, amount);
      result = await transaction.wait(); //will wait for the transaction to be included in the block, == confirmed transaction
    });

    it("Transfers token balances", async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900));
      expect(await token.balanceOf(receiver.address)).to.equal(amount);
    });

    it("Emits a token transfer", async () => {
      const event = result.events[0];
      expect(event.event).to.equal("Transfer");
      const args = event.args;
      expect(args.from, "deployer").to.equal(deployer.address);
      expect(args.to).to.equal(receiver.address);
      expect(args.value).to.equal(amount);
      // expect(args.)
    });
  });
  describe("Failure", () => {
    it("insuficiant funds transfer error", async () => {
      const invalidAmount = tokens(100000000);
      await expect(
        token.connect(deployer).transfer(receiver.address, invalidAmount)
      ).to.be.reverted;
    });
    it("rejects invalid recipent", async () => {
      const amount = tokens(100);

      await expect(
        token
          .connect(deployer)
          .transfer("0x0000000000000000000000000000000000000000", amount)
      ).to.be.reverted;
    });
  });
});
