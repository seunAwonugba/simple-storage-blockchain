// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpeStorage {
    uint public favouriteNumber;

    mapping(string => uint) public mapNameToFavNumber;

    People[] public people;

    struct People {
        uint favouriteNumber;
        string name;
    }

    function store(uint _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    function getter() public view returns (uint) {
        return favouriteNumber;
    }

    function addPeople(uint _favouriteNumber, string memory name) public {
        people.push(People(_favouriteNumber, name));
        mapNameToFavNumber[name] = _favouriteNumber;
    }
}
