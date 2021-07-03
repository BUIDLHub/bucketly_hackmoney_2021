// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./LibMerkle.sol";
import "./StorageTypes.sol";
import "./LibStorage.sol";
import "./BaseAccess.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract L2Bucket is BaseAccess {
    using LibMerkle for StorageTypes.MerkleStorage;

    event MerkleRootSet(uint256 bucketID, address indexed token, bytes32 rootHash);
    event Redeemed(uint256 bucketID, address indexed token, address indexed recipient, uint256 amount);

    constructor() {
        initAccess();
    }

    function addDepositMerkleRoot(uint256 bucketID, address tokenAddress, bytes32 rootHash) public onlyAdminOrRelay {
        LibStorage.getMerkleStorage().addDepositRoot(bucketID, tokenAddress, rootHash);
        emit MerkleRootSet(bucketID, tokenAddress, rootHash);
    }

    function redeem(uint256 bucketID, uint256 index, address tokenAddress, address recipient, uint256 amount, bytes32[] memory proof) public {
        //reverts if invalid or already redeemed
        //sets the redemption flag to true for bucket/token/recipient if valid
        LibStorage.getMerkleStorage().verifyRedemption(bucketID, tokenAddress, index, recipient, amount, proof);

        require(IERC20(tokenAddress).balanceOf(address(this)) >= amount, "Insufficient balance to redeem funds!");
        require(IERC20(tokenAddress).transfer(recipient, amount), "Token transfer failed");
        emit Redeemed(bucketID, tokenAddress, recipient, amount);
    }

}
