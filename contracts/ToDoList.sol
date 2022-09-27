//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    uint public _idUser;
    address public owner;

    address[] public creators;
    string[] public message;
    uint[] public messageId;

    struct ToDoListApp {
        address account;
        uint userId;
        string message;
        bool completed;
    }

    event ToDoEvent(address indexed account, uint indexed userId, string message, bool completed);
    mapping(address => ToDoListApp) public toDoListApps;

    constructor() {
        owner = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external{
        inc();
        uint idNumber = _idUser;
        ToDoListApp storage toDo = toDoListApps[msg.sender];
        toDo.account = msg.sender;
        toDo.message = _message;
        toDo.userId = idNumber;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);

        emit ToDoEvent(msg.sender, toDo.userId, _message, toDo.completed);
    }

    function getCreatorData( address _address) public view returns(address, uint, string memory, bool) {
        ToDoListApp memory singleUserdata = toDoListApps[_address];
        return(singleUserdata.account, singleUserdata.userId, singleUserdata.message, singleUserdata.completed);

    }

    function getAddress() external view returns(address[] memory){
        return creators;
    }

    function getMessage() external view returns(string[] memory){
        return message;
    }

    function toggle(address _creator) public{
        ToDoListApp storage singleUserData = toDoListApps[_creator];
        singleUserData.completed = !singleUserData.completed;//* Just to tick and untick it
    } 
}
