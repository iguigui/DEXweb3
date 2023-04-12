// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{
  string public name = "AndrewToken";
  string public symbol = "AGB";
  uint256 public decimals = 18; 
  uint256 public totalSupply = 1000000 * (10**decimals); //1,000,000 * 10^18; 

  constructor(string memory _name){
    name = _name;
  }
}
