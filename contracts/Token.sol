// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{
  string public name;
  string public symbol;
  uint256 public decimals = 18; 
  uint256 public totalSupply; //1,000,000 * 10^18; 

  mapping(address => uint256) public balanceOf;

  constructor(string memory _name, string memory _symbol, uint256 _totalSupply){
    name = _name;
    symbol = _symbol;
    totalSupply = _totalSupply * (10**decimals);
    //assign all the tokens to the deployer of the contract
    balanceOf[msg.sender] = totalSupply;
  }
}