// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

contract SimpleStorage {
    string storedData;

    function setSmartContract() public pure returns (string memory) {
        return "smart contract";
    }
}
