pragma solidity >=0.4.22 <0.7.0;

contract Mycontract{
    uint peopleCount=0;
    struct Person{
        uint id;
        string fname;
        string lname;
    }
    
   mapping(uint=>Person) public peopleMapping;
    
    function add(string memory fname, string memory lname) public{
        peopleCount++;
        peopleMapping[peopleCount]=Person(peopleCount, fname,lname);
    }
}