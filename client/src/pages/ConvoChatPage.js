import React, { useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Context } from "../context/AppContext";
import CallContainer from "../components/convochat/CallContainer";
import Chat from "../components/convochat/Chat";
import ToggleTheme from "../components/ToggleTheme";
import RoomHeader from "../components/RoomHeader";
import CatFishing from "../components/animationcomponent/CatFishing";
import BadCat from "../components/animationcomponent/BadCat";

const ConvoChatPage = () => {
  const {
    socket,
    info,
    setRoomCall,
    setInfo,
    setCurrentMsg,
    setMember,
    setMessageList,
    setFull,
    lightMode,
  } = useContext(Context);

  //getting the parameters from the route path or url
  const { roomId } = useParams();

  //redirect to the other page or component
  const navigate = useNavigate();

  //handling auto join to the room when reload or url is used for entering the room
  useEffect(() => {
    //notify server new user joined oom

    const loginUrl = () => {
      //store the time upon the run of this code
      const currentTime = new Date();
      const timeString =
        currentTime.getHours() + ":" + currentTime.getMinutes();

      //get the existing username from sessionStorage
      const userStore = sessionStorage.getItem("username");
      const userStoreParse = JSON.parse(userStore);

      //get the existing userList from sessionStorage
      const getDataUser = sessionStorage.getItem("userList");
      const getDataUserParse = JSON.parse(getDataUser) || [];

      //this will be the default username when url is used in entering to the room or when the page is reloaded
      let defaultUserName = "someone";

      //check first if the roomId is match with the existing userList data from sessionStorage
      const checkRoom = getDataUserParse.every((item) => item.room === roomId);

      //check first is there is not existing  store data for username insession storage
      //if null, will use the defaultUsername variable as the username
      //and communicate with the server that new user is joining the room
      if (userStoreParse === null) {
        //tell the server that new user is trying to join the room based on roomId
        socket.emit("joinRoom", { username: defaultUserName, room: roomId });
        //store the default username to session storage
        sessionStorage.setItem("username", JSON.stringify(defaultUserName));
        //store the default username to info variable
        setInfo({ username: defaultUserName });
        //store the roomID to roomCall variablev to pass to other component thru contextAPI
        setRoomCall(roomId); //for passing to otherr component

        //check first if the roomId is match to existing room data store in sessionStorage
        //then if true, will save the details for edit username together with the existing data from sessionStorage
        //and store the data to member list
        if (checkRoom) {
          sessionStorage.setItem(
            "userList",
            JSON.stringify([
              ...getDataUserParse,
              {
                connectedUser: true,
                username: defaultUserName,
                room: roomId,
                time: timeString,
              },
            ])
          );
          setMember([
            ...getDataUserParse,
            { connectedUser: true, username: defaultUserName, room: roomId },
          ]);
        } else {
          //if the roomId and existing room data is not match, it will create new list and remove the existing data from session storage
          //and set to member variable as well
          sessionStorage.setItem(
            "userList",
            JSON.stringify([
              {
                connectedUser: true,
                username: defaultUserName,
                room: roomId,
                time: timeString,
              },
            ])
          );
          setMember([{ connectedUser: true, username: defaultUserName }]);
        }
      } else {
        //this is for if there is existing username to session storage, it will be used againg for joining the room regardless of the room name
        //tell server that new user is trying to join the room and the username detail is based on existing username from session storage
        socket.emit("joinRoom", { username: userStoreParse, room: roomId });
        //store  existing username from session storage info.username
        setInfo({ username: userStoreParse });

        //store the roomId to roomCall varaible
        setRoomCall(roomId); //for passing to otherr component

        //check first if the roomId is match to existing room data store in sessionStorage
        //then if true, will save the details for edit username together with the existing data from sessionStorage
        //and store the data to member list and if false, will create new set of data and remove the existing data to session storage
        if (checkRoom) {
          sessionStorage.setItem(
            "userList",
            JSON.stringify([
              ...getDataUserParse,
              {
                connectedUser: true,
                username: userStoreParse,
                room: roomId,
                time: timeString,
              },
            ])
          );
          setMember([
            ...getDataUserParse,
            { connectedUser: true, username: userStoreParse },
          ]);
        } else {
          sessionStorage.setItem(
            "userList",
            JSON.stringify([
              {
                connectedUser: true,
                username: userStoreParse,
                room: roomId,
                time: timeString,
              },
            ])
          );
          setMember([{ connectedUser: true, username: userStoreParse }]);
        }
      }
    };

    //run the above function on every render or every time roomId change
    loginUrl();
  }, [roomId, setRoomCall]);

  //clean-up function when ConvoChat component unmount to DOM
  useEffect(() => {
    return () => {
      setInfo({
        username: "",
        room: "",
      });
      setRoomCall("");
      setCurrentMsg("");
      setMessageList([]);
      setMember([]);
      sessionStorage.clear();
    };
  }, []);

  useEffect(() => {
    //handling the auto checking if the room is full, security purposes
    //this will automatically redirect the user to Join Chat Form to enter or create new room
    socket.on("full", (full) => {
      if (full) {
        navigate("/");
        setInfo({
          username: "",
          room: "",
        });
        setRoomCall("");
        setCurrentMsg("");
        setMessageList([]);
        setMember([]);
        sessionStorage.clear();
        setFull(true);
        alert("Sorry the room is full, please enter another room. thanks");
      }
    });
  }, [socket]);

  return (
    <>
      {/* here will import the all the component related to toggle, chat, video, audio and header
        //use ternary operations to change the classname dynamically for styling  based on toggle theme function 
      */}
      <div
        data-theme={lightMode ? "cupcake" : "dark"}
        className="min-h-dvh justify-center "
      >
        <section className="mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 pb-5 m-auto relative  w-full flex flex-col gap-2">
          <ToggleTheme />
          <RoomHeader />

          <div className="flex flex-col md:flex-row lg:flex-row grow h-[1000px] md:h-[600px] lg:h-[600px] md:gap-2 gap-2 ">
            <div
              className={`flex flex-row gap-3 grow h-[800px] md:h-[600px] lg:h-[500px]  w-full  md:w-[70%] lg:w-[70%]  justify-center rounded-3xl ${
                lightMode
                  ? " text-gray-00 , bg-blue-200 "
                  : " shadow-white shadow-inner bg-[#2A323C]"
              } `}
            >
              <CallContainer />
            </div>
            <div
              className={`flex flex-row gap-2 p-5 grow h-[400px] md:h-[600px] lg:h-[500px]  w-full md:w-[30%] lg:w-[30%]  rounded-3xl  ${
                lightMode
                  ? " text-gray-00 , bg-blue-200 "
                  : " shadow-white shadow-inner bg-[#2A323C]"
              } `}
            >
              <Chat />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ConvoChatPage;
