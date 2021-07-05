// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library StorageTypes {


    struct MerkleStorage {
        //keyed by bucketID then ERC20 token
        mapping(uint => mapping(address => bytes32)) balanceRoots;

        //keyed by bucketID, then ERC20 token, then recipient
        mapping(uint => mapping(address => mapping(address => bool))) redemptions;
    }

    struct AccessControl {
        bool reentrantFlag;
        mapping(bytes32 => mapping(address => bool)) roles;
    }
}

