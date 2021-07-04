// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDepositManager {
    function depositEther() external payable;
    function transferAssets(
        address _token,
        address _user,
        uint256 _amountOrNFTId
    ) external;
    function depositERC20(address _token, uint256 _amount) external;
    function depositERC721(address _token, uint256 _tokenId) external;
}

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract BucketERC20 {
  address public depositManagerContract;
  address public bucketL2Address;

  struct BucketInfo {
    uint idCounter;
    uint expirationTime;
    uint expirationDate;
    uint thresholdAmount;
    uint totalAmount;
    uint fee;
  }
  
  // Previous: mapping (uint => mapping (address => mapping (address => uint))) deposits; // mapping keys: bucketId => tokenAddress => depositorAddress => balance
  mapping (address => mapping (uint => mapping (address => uint))) public deposits; // mapping keys: tokenAddress => bucketId => depositorAddress => balance
  mapping (address => BucketInfo) public bucketInfo; // mapping keys: tokenAddress => BucketInfo

  event BucketCreated(uint indexed id, uint indexed triggerAmount, uint indexed expirationDate);
  event Deposit(uint indexed bucketId, uint indexed amount, address indexed depositor);
  event Withdraw(uint indexed bucketId, uint indexed amount, address indexed withdrawer);
  event TransferToPoly(address indexed tokenAddress, uint indexed bucketId, uint indexed totalAmount);
  event InsufficientReserve(uint indexed bucketId);
  
  constructor(address _depositManagerContract, address _bucketL2Address) {
    depositManagerContract = _depositManagerContract;
    bucketL2Address = _bucketL2Address;
  }

  function createBucket(address _tokenAddress, uint _expirationTime, uint _thresholdAmount, uint _fee) public {
    bucketInfo[_tokenAddress].idCounter += 1;
    bucketInfo[_tokenAddress].expirationTime += _expirationTime;
    bucketInfo[_tokenAddress].expirationDate = block.timestamp + _expirationTime;
    bucketInfo[_tokenAddress].thresholdAmount += _thresholdAmount;
    bucketInfo[_tokenAddress].fee = _fee;
    bucketInfo[_tokenAddress].totalAmount = 0;

    emit BucketCreated(bucketInfo[_tokenAddress].idCounter, _thresholdAmount, bucketInfo[_tokenAddress].expirationDate);
  }

  function setExpirationTime(address _tokenAddress, uint _expirationTime) public {
    bucketInfo[_tokenAddress].expirationTime = _expirationTime;
  }

  function setExpirationDate(address _tokenAddress, uint _expirationDate) public {
    bucketInfo[_tokenAddress].expirationDate = _expirationDate;
  }

  function setThresholdAmount(address _tokenAddress, uint _thresholdAmount) public {
    bucketInfo[_tokenAddress].thresholdAmount = _thresholdAmount;
  }

  function setFee(address _tokenAddress, uint _fee) public {
    bucketInfo[_tokenAddress].fee = _fee;
  }

  function deposit(address _tokenAddress, uint depositAmount) public {
    ERC20 tokenContract = ERC20(_tokenAddress);
    require(tokenContract.balanceOf(msg.sender) >= depositAmount, "Insufficient balance");
    require(tokenContract.allowance(msg.sender, address(this)) >= depositAmount, "Insufficient allowance");
    
    require(tokenContract.transferFrom(msg.sender, address(this), depositAmount), "Could not transfer tokens from depositor");
    bucketInfo[_tokenAddress].totalAmount += depositAmount;
    uint activeBucketId = bucketInfo[_tokenAddress].idCounter;
    deposits[_tokenAddress][activeBucketId][msg.sender] = depositAmount;
    emit Deposit(activeBucketId, depositAmount, msg.sender);
  }

  function refund(address _tokenAddress) public {
    uint currentBucketId = bucketInfo[_tokenAddress].idCounter;
    uint userDepositBalance =  deposits[_tokenAddress][currentBucketId][msg.sender];
    require(userDepositBalance > 0, "Msg.sender deposit balance is zero");
    ERC20 tokenContract = ERC20(_tokenAddress);
    require(tokenContract.balanceOf(address(this)) >= userDepositBalance, "Insufficient balance");
    
    bucketInfo[_tokenAddress].totalAmount -= userDepositBalance;
    deposits[_tokenAddress][currentBucketId][msg.sender] = 0;
    require(tokenContract.transfer(msg.sender, userDepositBalance), "Could not transfer tokens");
    emit Withdraw(currentBucketId, userDepositBalance, msg.sender);
  }

  function makeTransfer(address _tokenAddress, uint _amount) public {
    if (block.timestamp < bucketInfo[_tokenAddress].expirationDate) {
      require(bucketInfo[_tokenAddress].totalAmount >= bucketInfo[_tokenAddress].thresholdAmount, "Threshold amount not reached");  
    }
    uint fee = bucketInfo[_tokenAddress].fee;
    uint transferAmount = _amount - (_amount * fee / 100);
    ERC20 tokenContract = ERC20(_tokenAddress);
    require(tokenContract.balanceOf(address(this)) >= transferAmount, "Insufficient balance");
    
    require(tokenContract.approve(depositManagerContract, transferAmount), "Could not approve depositManagerContract");
    IDepositManager(depositManagerContract).depositERC20(_tokenAddress, transferAmount);
    
    //delete balances
    // uint currentBucketId = bucketInfo[_tokenAddress].idCounter;
    // delete deposits[_tokenAddress][currentBucketId];
    
    //+= 1 bucketID
    uint transferredBucketId = bucketInfo[_tokenAddress].idCounter;
    bucketInfo[_tokenAddress].idCounter += 1;
    emit TransferToPoly(_tokenAddress, transferredBucketId, transferAmount);
  }
}
