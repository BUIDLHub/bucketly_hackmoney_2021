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

contract BucketERC20 {
  uint public bucketIdCount;
  uint public activeBucketId;
  uint256 public expirationDate;
  address public depositManagerContract;
  address public bucketL2Address;

  struct BucketInfo {
    uint idCounter;
    uint expirationTime;
    uint thresholdAmount;
  }
  
  mapping (uint => mapping (address => mapping (address => uint))) deposits; // mapping keys: bucketId => tokenAddress => depositorAddress => balance
  mapping(address => BucketInfo) bucketInfo; // mapping keys: tokenAddress => BucketInfo

  event BucketCreated(uint indexed id, uint indexed triggerAmount, uint indexed expirationDate);
  event Deposit(uint indexed bucketId, uint indexed amount, address indexed depositor);
  event Withdraw(uint indexed bucketId);
  event TransferToPoly(uint indexed bucketId, uint indexed totalAmount);
  event InsufficientReserve(uint indexed bucketId);
  
  constructor(address _depositManagerContract, address _bucketL2Address) {
    depositManagerContract = _depositManagerContract;
    bucketL2Address = _bucketL2Address;
    bucketIdCount = 0;
  }

  function createBucket(address tokenAddress, uint _expirationTime, uint _thresholdAmount) public {
    bucketInfo[tokenAddress].idCounter += 1;
    bucketInfo[tokenAddress].expirationTime += _expirationTime;
    bucketInfo[tokenAddress].thresholdAmount += _thresholdAmount;

    expirationDate = block.timestamp + _expirationTime;
    emit BucketCreated(bucketInfo[tokenAddress].idCounter, _thresholdAmount, expirationDate);
  }

  function deposit(address _tokenAddress, uint depositAmount) public {
    ERC20 tokenContract = ERC20(_tokenAddress);
    require(tokenContract.balanceOf(msg.sender) >= depositAmount, "Insufficient balance");
    require(tokenContract.allowance(msg.sender, address(this)) >= depositAmount, "Insufficient allowance");
    
    require(tokenContract.transferFrom(msg.sender, address(this), depositAmount), "Could not transfer tokens from depositor");
    deposits[activeBucketId][_tokenAddress][msg.sender] = depositAmount;
    emit Deposit(activeBucketId, depositAmount, msg.sender);
  }

  function makeTransfer(address _tokenAddress, uint _amount) public {
    ERC20 tokenContract = ERC20(_tokenAddress);
    require(tokenContract.balanceOf(address(this)) >= _amount, "Insufficient balance");
    
    require(tokenContract.approve(depositManagerContract, _amount), "Could not approve depositManagerContract");
    IDepositManager(depositManagerContract).depositERC20(_tokenAddress, _amount);
    createBucket(_tokenAddress, bucketInfo[_tokenAddress].expirationTime, bucketInfo[_tokenAddress].thresholdAmount);
    emit TransferToPoly(activeBucketId, _amount);
  }
  
  function refund() public {}
}
