pragma solidity >=0.4.22 <0.7.0;

contract Mycontract{
    struct Person{
        string fname;
        string lname;
    }
    
    Person[] public peopleArray;
    
    function add(string memory fname, string memory lname) public{
        peopleArray.push(Person(fname,lname));
    }
}
