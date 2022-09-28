//! we are going to write all the functionalities for our application for communicating with our smart contract for creating todo list

import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//Internal import
import { toDoListAddress, toDoListABI } from "./constants";

//? 'fetchContract' function will allow to communicate with smartcontract
const fetchContract = (siggnerOrProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, siggnerOrProvider);

//as we are using react for data/state management
export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [allAddress, setAllAddress] = useState([]);

  //----Connecting metamask---
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please install metamask"); //Check metamask is present in the browser or not

    const account = await window.ethereum.request({ method: "eth_accounts" }); // Grabbing account

    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
    } else {
      setError("Please install metamask and reload");
    } // In case of presense of multiple accounts, we will grab 1st account and use it.
  };

  //----Connect Wallet---
  const connectWallet = async () => {
    //Doing the same check as above
    if (!window.ethereum) return setError("Please install metamask");

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    //!Notice: method is a bit different here

    setCurrentAccount(account[0]);
  };

  //---Interacting with smartcontract---
  //this function will allow user to create todolist
  const toDoList = async (message) => {
    try {
      //Connecting with smartcontract using web3modal
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      console.log(contract);
    } catch (err) {
      setError("Something wrong creating list");
    }
  };

  return (
    <ToDoListContext.Provider
      value={{ checkIfWalletIsConnected, connectWallet, toDoList }}
    >
      {children}
    </ToDoListContext.Provider>
  ); //?'value' will allow this function to be used from another pages via the 'context' api
};
