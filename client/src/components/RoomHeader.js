import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import CopyToClipBoard from "./CopyToClipBoard";

/* header component */
const RoomHeader = () => {
  const {
    socket,
    roomCall,
    setRoomCall,
    setInfo,
    setCurrentMsg,
    setMember,
    setMessageList,
    setFull,
    lightMode,
    leaveCall,
    usernameStore,
    callAccepted,
    receivingCall,
  } = useContext(Context);

  //can be used to movve the page by URL path and clicking a certain button
  const navigate = useNavigate();

  //function for exit room in server and cleaning up the state and ending all session present
  const exitRoom = () => {
    const confirm = window.confirm("Are you sure your want to exit???");
    if (confirm) {
      const dataExit = { username: usernameStore, room: roomCall };
      socket.emit("exitRoom", dataExit);
      sessionStorage.clear();
      alert("exit room");
      navigate("/");
      setInfo({
        username: "",
        room: "",
      });
      setRoomCall("");
      setCurrentMsg("");
      setMessageList([]);
      setMember([]);
      setFull(false);
      if (callAccepted || receivingCall) {
        leaveCall();
      }
    }
  };

  return (
    <>
   {/*  //room header */}
      <hgroup
        className={`flex flex-col py-5  rounded-3xl  mt-10 text-center ${
          lightMode
            ? " text-gray-700 , bg-blue-200 "
            : " shadow-white shadow-inner bg-[#2A323C]"
        } `}
      >
        <h1
          className={`text-2xl lg:text-4xl tracking-widest ${
            lightMode ? "text-gray-700" : "text-white"
          }`}
        >
          Welcome to Room{" "}
          <strong className=" group">
            {roomCall} <CopyToClipBoard />
          </strong>
          !
        </h1>
        <h2 className="text-xs lg:text-lg">
          Enjoy your stay here and have a great talk.
        </h2>
        <button
          type="button"
          className="btn btn-ghost hover:bg-slate-500 hover:text-white w-40 m-auto text-xl"
          onClick={exitRoom}
        >
          Exit Room
        </button>
      </hgroup>
    </>
  );
};

export default RoomHeader;
