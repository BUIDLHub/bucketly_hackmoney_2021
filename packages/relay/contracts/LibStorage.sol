// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StorageTypes.sol";

library LibStorage {

    bytes32 constant MERKLE_STORAGE = 0x636f6d2e6275636b65746c792e4d65726b6c6553746f72616765000000000000;

    bytes32 constant ACCESS_STORAGE = 0x636f6d2e6275636b65746c792e416363657373436f6e74726f6c000000000000;

    function getMerkleStorage() internal pure returns (StorageTypes.MerkleStorage storage ms) {
        assembly { ms.slot := MERKLE_STORAGE }
    }

    function getAccessStorage() internal pure returns (StorageTypes.AccessControl storage acs) {
        assembly {acs.slot := ACCESS_STORAGE }
    }
}