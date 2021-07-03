// contracts/DummyERC20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DummyERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("Dummy", "DMY") {
        _mint(msg.sender, initialSupply);
    }
}