// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BucketFactory {
  uint public testValue;
  uint public bucketIds;

  event BucketCreated(uint indexed id, string token, uint indexed triggerAmount, uint indexed expirationDate);
  
  constructor() {
    testValue = 42;
    bucketIds = 0;
  }

  function createBucket(string memory tokenName, uint triggerAmount) public {
    uint id = bucketIds;
    bucketIds = bucketIds + 1;
    emit BucketCreated(id, tokenName, triggerAmount, block.timestamp);
  }
}
