// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./StorageTypes.sol";

import "hardhat/console.sol";

library LibMerkle {

    function addDepositRoot(StorageTypes.MerkleStorage storage merk, 
                    uint256 bucketID,
                    address token,
                    bytes32 rootHash) external {
        merk.balanceRoots[bucketID][token] = rootHash;
    }

    function verifyRedemption(
        StorageTypes.MerkleStorage storage merk, 
        uint256 bucketID,
        address token,
        uint256 index, 
        address recipient, 
        uint256 amount, 
        bytes32[] memory merkleProof) external {

        require(!merk.redemptions[bucketID][token][recipient], "Already redeemed");


        bytes32 node = keccak256(abi.encode(index, recipient, amount));
        console.log("Leaf node");
        console.logBytes32(node);
        uint256 path = index;
        for (uint16 i = 0; i < merkleProof.length; i++) {
            if ((path & 0x01) == 1) {
                node = keccak256(abi.encode(merkleProof[i], node));
            } else {
                node = keccak256(abi.encode(node, merkleProof[i]));
                console.log("Odd node");
                console.logBytes32(node);
            }
            path /= 2;
        }

        // Check the merkle proof
        bytes32 _rootHash = merk.balanceRoots[bucketID][token];
        console.log("Roothash");
        console.logBytes32(_rootHash);
        console.log("final node");
        console.logBytes32(node);
        require(node == _rootHash, "Invalid proof");
        merk.redemptions[bucketID][token][recipient] = true;
    }
}
