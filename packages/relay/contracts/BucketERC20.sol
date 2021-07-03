// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BucketERC20 {
  uint public bucketIdCount;
  uint public activeBucketId;
  uint public minimumReserve;
  uint256 public expirationTime;
  uint256 public expirationDate;
  address public erc20Address;
  string public tokenName;

  mapping (uint => mapping (address => uint)) public deposits;

  event BucketCreated(uint indexed id, string token, uint indexed triggerAmount, uint indexed expirationDate);
  event Deposit(uint indexed bucketId, uint indexed amount, address indexed depositor);
  event Withdraw(uint indexed bucketId);
  event TransferToPoly(uint indexed bucketId, uint indexed totalAmount);
  event InsufficientReserve(uint indexed bucketId);
  
  constructor(address _erc20Address, string memory _tokenName, uint _triggerAmount, uint _minimumReserve, uint256 _expirationTime) {
    bucketIdCount = 0;
    erc20Address = _erc20Address;
    minimumReserve = _minimumReserve;
    tokenName = _tokenName;
    expirationTime = _expirationTime;

    createBucket(_triggerAmount);
  }

  function createBucket(uint triggerAmount) public {
    bucketIdCount = bucketIdCount + 1;
    uint id = bucketIdCount;
    activeBucketId = bucketIdCount;
    expirationDate = block.timestamp + expirationTime;
    emit BucketCreated(id, tokenName, triggerAmount, expirationDate);
  }

  function deposit(uint depositAmount) public {
    ERC20 tokenContract = ERC20(erc20Address);
    require(tokenContract.balanceOf(msg.sender) >= depositAmount, "Insufficient balance");
    require(tokenContract.allowance(msg.sender, address(this)) >= depositAmount, "Insufficient allowance");
    require(tokenContract.transferFrom(msg.sender, address(this), depositAmount), "Could not transfer tokens from depositor");
    deposits[activeBucketId][msg.sender] = depositAmount;
    emit Deposit(activeBucketId, depositAmount, msg.sender);
  }

  function makeTransfer() public {}
  
  function refund() public {}
}
