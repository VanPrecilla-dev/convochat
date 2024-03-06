import React, { useEffect, useState, useRef, useContext } from "react";

import { Context } from "../../context/AppContext";

import ChangeUsername from "../ChangeUsername";

import { CiEdit } from "react-icons/ci";
import BadCat from "../animationcomponent/BadCat";

const Chat = ({ roomId, defaultUserName }) => {
  //consume the contextAPI
  const {
    socket,
    info,
    member,
    messageList,
    setMessageList,
    currentMessage,
    setCurrentMsg,
    roomCall,
    setMember,
    usernameStore,
    lightMode,
  } = useContext(Context);
  const { username, room } = info;

  const [editUsername, setEditUsername] = useState(false);

  //for scroll down when there is new user and message, for scrollIntoView()
  const scrollRef = useRef(null);
  const userScrollRef = useRef(null);

  //to make the message view to scroll down to latest message when send and receive
  useEffect(() => {
    if (messageList.length) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messageList, setMessageList]);

    //to make the user list view to scroll down to latest message when send and receive
  useEffect(() => {
    if (member.length) {
      userScrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [member, setMember]);

  //to open edit input and edit the username
  const editUsernameBtn = () => {
    setEditUsername(true);
    console.log(editUsername);
  };

  //for sending message, this will emit socket to communicate with server, store to messagelist to show in message view
  const sendMessage = () => {
    if (currentMessage !== "") {
      //store to variable the message , username and room
      const messageData = {
        room: info.room || roomCall,
        author: usernameStore || info.username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      //to communicate with server, and this code will send the message to other user
      socket.emit("sendMessage", messageData);

      //to store the message to messageList and this will auto show on message view
      setMessageList((list) => [
        ...list,
        { receivedMsg: false, messageData: messageData },
      ]);
      console.log(messageList);
      //to clear the message input
      setCurrentMsg("");
    }
  };


  return (
    <>
      <div
        className={`flex flex-col flex-1 p-1 rounded-2xl overflow-hidden  ${
          lightMode ? "bg-white" : "bg-[#435060]"
        } `}
      >
        {/* show username, and open edit input username */}
        <div className="flex flex-col text-start text-pretty break-words ">
          <p>Live Chat </p>
          <p className=" group">
            Username : <strong>{username}</strong>{" "}
            <div
              className="tooltip tooltip-left text-white"
              data-tip="edit username"
            >
              <button
                className="hover:bg-slate-400 rounded-lg invisible group-hover:visible absolute p-1 "
                onClick={editUsernameBtn}
              >
                <CiEdit style={{ width: "25px" }} />
              </button>
            </div>
          </p>
        {/* edit input form */}
          {editUsername && <ChangeUsername setEditUsername={setEditUsername} />}
        </div>
        <div
          className={`flex flex-initial flex-col gap-1 w-full grow h-20  hide-scrollbar border-2 overflow-y-auto ${
            lightMode ? "bg-white" : " border-gray-500"
          }`}
        >
          <p
            className={`flex text-center  ${
              lightMode ? "border-2 border-gray-100" : " bg-slate-70"
            } 0`}
          >
            Users List:{" "}
          </p>

          {/* show the userlist joined, disconnected and history of change username 
          check first if array so that code will notbreak if memmber is not an array
          */}
          {Array.isArray(member) ? (
            member.map((item) => (
              <ul className="flex flex-col gap-1">
                {item.connectedUser && (
                  <li>
                    Joined : {item.username} Time : {item.time}
                  </li>
                )}
                {item.disconnectedUser && (
                  <li>
                    Disconnect : {item.username} Time : {item.time}
                  </li>
                )}
                {item.editUsername && (
                  <li>
                    {" "}
                    Change Username: from {item.oldUsername} to {item.username}{" "}
                  </li>
                )}
              </ul>
            ))
          ) : (
            <p>no data</p>
          )}
          {/* to scroll down when new user joined */}
          <div ref={userScrollRef}></div>
        </div>

          {/* show the message for sent and received, this will be cleared every reload of the page 
          check first if array so that code will notbreak if messageList is not an array
          */}
        <div className="flex flex-col gap-3 w-full grow h-96 text-black overflow-y-auto ">
          {messageList.map((item) => (
            <div
              className={
                item.receivedMsg
                  ? " text-pretty break-words "
                  : " text-pretty break-words flex flex-col text-end items-end pr-5"
              }
            >
              <p className="chat-header ">{item.messageData.author}</p>

              <p
                className={
                  item.receivedMsg
                    ? "chat-bubble text-white bg-slate-500 "
                    : "chat-bubble text-white bg-green-500 "
                }
              >
                {item.messageData.message}
              </p>
              <p className="chat-header ">{item.messageData.time}</p>
            </div>
          ))}
          {/* to scroll down when new message is added for sent and received */}
          <div ref={scrollRef}></div>
        </div>

        {/* animation design */}
        <div className="z--20 absolute lg:absolute right-[-10px] bottom-[70px]  md:right-[-10px] md:bottom-[70px] lg:right-[60px] lg:bottom-[170px] w-[100px] h-[100px]">
          <BadCat />
        </div>
        
        {/* to enter the message */}
        <div className="flex flex-initial flex-row z-50 max-h-[100px] ">
          <textarea
            className="flex input input-bordered rounded-2xl w-[80%] max-h-[100px] min-h-[50px] text-pretty break-words overflow-y-auto"
            placeholder="add ur message here"
            value={currentMessage || ""}
            onChange={(e) => setCurrentMsg(e.target.value)}
          />

          <button
            className="flex btn btn-primary  rounded-2xl  w-[20%]"
            onClick={sendMessage}
          >
            Send
          </button>

          <br />

          <br />
        </div>
      </div>
    </>
  );
};

export default Chat;
