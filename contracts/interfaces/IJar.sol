// SPDX-License-Identifier: unlicensed"

pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IJar is IERC20 {
    event Deposit(address indexed _from, uint256 _value);

    function getRatio() external view returns (uint256);
}
