// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BucketFactory {
  uint public testValue;

  event BucketCreated(uint indexed _newTestValue);
  
  constructor() {
    testValue = 42;
  }

  function createBucket() public {
    emit BucketCreated(testValue);
  }
}