// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "./LibAccess.sol";
import "./StorageTypes.sol";
import "./LibStorage.sol";

abstract contract BaseAccess {
    using LibAccess for StorageTypes.AccessControl;
    

    //bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant ADMIN_ROLE = 0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775;
    
    //bytes32 public constant RELAY_ROLE = keccak256("RELAY_ROLE");
    bytes32 public constant RELAY_ROLE = 0x077a1d526a4ce8a773632ab13b4fbbf1fcc954c3dab26cd27ea0e2a6750da5d7;
    
    function _msgSender() internal view returns (address payable) {
        return msg.sender;
    }

    function hasRole(bytes32 role, address actor) public view returns (bool) {
        return LibStorage.getAccessStorage().hasRole(role, actor);
    }

    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, _msgSender()), "Not admin");
        _;
    }

    modifier onlyRelay() {
        require(hasRole(RELAY_ROLE, _msgSender()), "Not relay");
        _;
    }

    modifier onlyAdminOrRelay() {
        require (hasRole(ADMIN_ROLE, _msgSender()) || hasRole(RELAY_ROLE, _msgSender()), "Not admin or relay");
        _;
    }

    function addRole(bytes32 role, address actor) public onlyAdmin {
        _setupRole(role, actor);
    }

    function revokeRole(bytes32 role, address actor) public onlyAdmin {
        LibStorage.getAccessStorage()._revokeRole(role, actor);
    }

    function _setupRole(bytes32 role, address actor) internal {
        LibStorage.getAccessStorage()._addRole(role, actor);
    }

    function initAccess() internal {
        address o = _msgSender();
        _setupRole(ADMIN_ROLE, o);
    }
}