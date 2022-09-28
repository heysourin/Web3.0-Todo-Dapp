//! we are going to write all the functionalities for our application for communicating with our smart contract for creating todo list

import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//Todo: Internal import
import { toDoListAddress, toDoListABI } from "./constants";

//? 'fetchContract' function will allow to communicate with smartcontract
const fetchContract = (siggnerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, siggnerOrProvider);

//Todo: as we are using react for data/state management
export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [allAddress, setAllAddress] = useState([]);

  //Todo: Checking if wallet is present in the browser or not----
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please install metamask"); //Check metamask is present in the browser or not
    const account = await window.ethereum.request({ method: "eth_accounts" }); // Grabbing account

    // In case of presense of multiple accounts, we will grab 1st account and use it.
    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("Please install metamask and reload");
    }
  };

  //Todo: ---Connecting to the Wallet---
  const connectWallet = async () => {
    //Doing the same checks as above
    if (!window.ethereum) return setError("Please install metamask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });//!Notice: 'method: "eth_requestAccounts"'

    setCurrentAccount(account[0]);
  };

  //*---Interacting with smartcontract---

  //TODO: This function will allow user to create 'todolist', grabbing the fucntion from smart contract
  const toDoList = async (message) => {
    try {
      //Connecting with smartcontract using web3modal
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);
      
      const createList = await contract.createList(message);
      createList.wait();
      console.log(createList);
    } catch (err) {
      setError("Something wrong creating list");
    }
  };
  
  //TODO: This function will allow user to create getTodolist', grabbing the fucntion from smart contract
  const getToDoList = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      //Getting the data
      const getAllAddress = contract.getAddress();
      setAllAddress(getAllAddress);//* Putting the data of the contract into this react component
      console.log(getAllAddress);

      getAllAddress.map(async (el) => {
        const getSingleData = await contract.getCreatorData();
        allToDoList.push(getAllAddress);
        console.log(getSingleData);
      });

      const allMessage = await contract.getMessage();

      setMyList(allMessage);
    } catch (err) {
      setError("Something wrong getting data");
    }
  };

  //Todo: Change state of task (Toggle)
  const change = async (address) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const state = await contract.toggle(address);
      state.wait();
      console.log(state);
    } catch (error) {
      setError("Something wrong changing state");
    }
  };

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        toDoList,
        getToDoList,
        change,
        currentAccount,
        allToDoList,
        error,
        myList,
        allAddress
      }}
    >
      {children}
    </ToDoListContext.Provider>
  ); //?'value' will allow this function to be used from another pages via the 'context' api
};
