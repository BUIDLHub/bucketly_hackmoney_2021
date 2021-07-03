//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "./StorageTypes.sol";


library LibAccess {
    
    function hasRole(StorageTypes.AccessControl storage ac, bytes32 role, address actor) external view returns (bool) {
        return ac.roles[role][actor];
    }

    function _addRole(StorageTypes.AccessControl storage ac, bytes32 role, address actor) internal  {
        ac.roles[role][actor] = true;
    }

    function _revokeRole(StorageTypes.AccessControl storage ac, bytes32 role, address actor) internal  {
        delete ac.roles[role][actor];
    }
}