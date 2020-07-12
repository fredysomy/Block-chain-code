// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

contract Todo {
    int256 result = 0;

    function add(int256 a, int256 b) public returns (int256) {
        result = a + b;
        return show();
    }

    function sub(int256 a, int256 b) public returns (int256) {
        result = a - b;
        return show();
    }

    function mul(int256 a, int256 b) public returns (int256) {
        result = a * b;
        return show();
    }

    function div(int256 a, int256 b) public returns (int256) {
        result = a / b;
        return show();
    }

    function show() public view returns (int256) {
        return result;
    }
}
