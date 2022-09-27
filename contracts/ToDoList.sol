//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ToDoList {
    uint public _idUser;
    address public owner;

    address[] public creators;
    string[] public message;
    uint public messageId;

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

    function inc()  returns () {
        _idUser++;
    }

    function createList(string calldata _message) external{
        inc();
        uint idNumber = _idUser;
        ToDoListApp storage toDo = toDoListApps[msg.sender];
        toDo.account = msg.sender;
        toDo.message = _message;
        toDo.userId = idNumber;
    }
}
