// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract BucketFactory {
  uint public testValue;

  event BucketCreated(string indexed token, uint indexed triggerAmount, uint indexed expirationDate);
  
  constructor() {
    testValue = 42;
  }

  function createBucket(string memory tokenName, uint triggerAmount) public {
    emit BucketCreated(tokenName, triggerAmount, block.timestamp);
  }
}
