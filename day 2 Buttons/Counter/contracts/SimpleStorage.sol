// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

contract SimpleStorage {
    string storedData;

    function hello() public pure returns (string memory) {
        return "hello world";
    }

    function hi() public pure returns (string memory) {
        return "hi everyone";
    }
}
