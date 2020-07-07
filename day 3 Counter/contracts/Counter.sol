// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

contract Counter {
    int256 public data = 0;

    function add() public {
        ++data;
    }

    function subtract() public {
        --data;
    }

    function viewData() public view returns (int256) {
        return data;
    }
}
