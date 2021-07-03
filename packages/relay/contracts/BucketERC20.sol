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
  uint public minimumReserve;
  uint public thresholdAmount;
  uint256 public expirationTime;
  uint256 public expirationDate;
  address public erc20Address;
  address public depositManagerContract;
  string public tokenName;

  mapping (uint => mapping (address => uint)) public deposits;

  event BucketCreated(uint indexed id, string token, uint indexed triggerAmount, uint indexed expirationDate);
  event Deposit(uint indexed bucketId, uint indexed amount, address indexed depositor);
  event Withdraw(uint indexed bucketId);
  event TransferToPoly(uint indexed bucketId, uint indexed totalAmount);
  event InsufficientReserve(uint indexed bucketId);
  
  constructor(address _depositManagerContract, address _erc20Address, string memory _tokenName, uint _thresholdAmount, uint _minimumReserve, uint256 _expirationTime) {
    depositManagerContract = _depositManagerContract;
    erc20Address = _erc20Address;
    bucketIdCount = 0;
    minimumReserve = _minimumReserve;
    tokenName = _tokenName;
    thresholdAmount = _thresholdAmount;
    expirationTime = _expirationTime;

    createBucket();
  }

  function createBucket() public {
    bucketIdCount = bucketIdCount + 1;
    uint id = bucketIdCount;
    activeBucketId = bucketIdCount;
    expirationDate = block.timestamp + expirationTime;
    emit BucketCreated(id, tokenName, thresholdAmount, expirationDate);
  }

  function deposit(uint depositAmount) public {
    ERC20 tokenContract = ERC20(erc20Address);
    require(tokenContract.balanceOf(msg.sender) >= depositAmount, "Insufficient balance");
    require(tokenContract.allowance(msg.sender, address(this)) >= depositAmount, "Insufficient allowance");
    require(tokenContract.transferFrom(msg.sender, address(this), depositAmount), "Could not transfer tokens from depositor");
    deposits[activeBucketId][msg.sender] = depositAmount;
    emit Deposit(activeBucketId, depositAmount, msg.sender);
  }

  function makeTransfer(uint _amount) public {
    ERC20 tokenContract = ERC20(erc20Address);
    require(tokenContract.balanceOf(address(this)) >= _amount, "Insufficient balance");
    require(tokenContract.approve(depositManagerContract, _amount), "Could not approve depositManagerContract");
    IDepositManager(depositManagerContract).depositERC20(erc20Address, _amount);
    createBucket();
    emit TransferToPoly(activeBucketId, _amount);
  }
  
  function refund() public {}
}
