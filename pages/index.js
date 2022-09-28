import React, { useState, useEffect, useContext } from "react";
import { ToDoListContext } from "../context/ToDolistApp";
// import {mdverified}

const Home = () => {
  const { checkIfWalletIsConnected, toDoList } = useContext(ToDoListContext);
  useEffect(() => {
    checkIfWalletIsConnected();
    toDoList();
  }, []);
  return <div></div>;
};

export default Home;
