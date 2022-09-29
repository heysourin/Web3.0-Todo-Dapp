import React, { useState, useEffect, useContext } from "react";
import { MdVerified, RiSendPlaneLine } from "react-icons/md";
import Image from "next/image";
import { RiSendPlmaneLine, RiCloseFill, RiSendPlaneFill } from 'react-icons/ri'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'

// Internal import
import { ToDoListContext } from "../context/ToDolistApp";
import Style from "../styles/index.module.css";
import Data from "../component/Data";
import Loading from "../1amw.gif";

const Home = () => {
  const [message, setMessage] = useState("");
  const {
    checkIfWalletIsConnected,
    connectWallet,
    toDoList,
    getToDoList,
    allToDoList,
    change,
    currentAccount,
    error,
    myList,
    allAddress,
  } = useContext(ToDoListContext);


  useEffect(() => {
    checkIfWalletIsConnected();
    getToDoList();
  }, []);

  return (
    <>
      <div className={Style.home}>
        <div className={Style.navBar}>
          <Image src={Loading} alt="Logo" width={50} height={50}/>
          <div className={Style.connect}>
            {!currentAccount ? (
              <button onClick={() => {}}>Connect Account</button>
            ) : (
              <button>{currentAccount.slice(0, 10)}...</button>
            )}
          </div>
        </div>

        <div className={Style.home_box}>
          <div className={Style.home_completed}>
            <h2>To Do History List</h2>
            <div>
              {myList.map((el, i) => (
                <div className={Style.home_completed_list}>
                  <MdVerified className={Style.iconColor} />
                  <p>{el.slice(0, 30)}...</p>
                </div>
              ))}
            </div>
          </div>

          <div className={Style.home_create}>
            <div className={Style.home_create_box}>
              <h2>Create Blockchain Todo List</h2>
              <div className={Style.home_create_input}>
                <input
                  type="text"
                  placeholder="Enter your task"
                  onChange={(e) => setMessage(e.target.value)}
                />

                {currentAccount ? (
                  <RiSendPlaneFill
                    className={Style.iconBlack}
                    onClick={() => toDoList(message)}
                  />
                ) : (
                  <RiSendPlaneFill
                    className={Style.iconBlack}
                    onClick={() => connectWallet()}
                  />
                )}
              </div>
              <Data allToDoList={allToDoList}
              allAddress={allAddress}
              myList={myList}
              change={change}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
