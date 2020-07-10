// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Todolist {
    string[] public list;

    function addValue(string memory _value) public {
        list.push(_value);
        show();
    }

    function show() public view returns (string[] memory) {
        return list;
    }
}
