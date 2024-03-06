import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import { useBeforeUnload } from "react-router-dom";
import { connected } from "process";

//edit form component
const ChangeUsername = ({ setEditUsername }) => {
  const {
    socket,
    info,
    setInfo,
    usernameStore,
    setUsernameStore,
    member,
    setMember,
    roomCall,
  } = useContext(Context);
  const { username, room } = info;

  //store the temporary username to change into
  const [changeUser, setChangeUser] = useState("");

  //to store the detailes on the chnages of username
  let updatedMember;

  //button for change username
  const changeUsernameBtn = () => {
    //get the existing data on sessionStorage 
    const getDataUser = sessionStorage.getItem("userList");
    const getDataUserParse = JSON.parse(getDataUser) || [];

    //check first if edit input is not empty then proceed to changing usename on state and session Storage
    if (changeUser !== "") {
      //store the old username
      let oldUsername = username;
      //find the existing latest record of username
      const findUsername = member.find((obj) => obj.username === usernameStore);

      //after findingthe object, will update and storeit into new variable
      if (findUsername) {
        updatedMember = {
          ...findUsername,
          username: changeUser,
          oldUsername: oldUsername,
          editUsername: true,
        };
      }

      //check if object array with details for edit username is not false then proceed to saving the userList to session storage
      //together the previous data in sessionSTorage with same room name
      if (updatedMember) {
        sessionStorage.setItem(
          "userList",
          JSON.stringify([...getDataUserParse, updatedMember])
        );

        //store in member variable the newly added details for changing the username
        setMember([...getDataUser, updatedMember]);

        //to communicate with server and tell that there is changes on username, this will also tell to server of other user
        socket.emit("changeUsername", {
          connectedUser: updatedMember.connectedUser,
          username: updatedMember.username,
          oldUsername: updatedMember.oldUsername,
          editUsername: updatedMember.editUsername,
          room: roomCall,
        });

        //set now he newly edit username to session Storage so that when still will be used when reload or rerender
        sessionStorage.setItem("username", JSON.stringify(changeUser));
        setInfo({ username: changeUser });

        //get the newly edit username in session storage then store it to varibale so that it will edit the other part of the chat app using username
        const newUserName = sessionStorage.getItem("username");
        setUsernameStore(JSON.parse(newUserName));
        //then close the edit form after all the opertation is completed
        setEditUsername(false);
        console.log("edit yes", member);
      } else {
        //if updatemember is null, will just close the edit form and no changes made
        setEditUsername(false);
      }
    } else {
       //if user name is blank, will just close the edit form and no changes made
      setEditUsername(false);
    }
  };

  //for debugging purposes
  useEffect(() => {
    console.log("edit yes", member);
  }, [member]);

  return (
    <>
    {/* edit form */}
      <div className="flex flex-row justify-center ">
        <input
          type="text"
          className="flex input input-bordered rounded-2xl  w-[80%] max-h-[100px] min-h-[50px] text-pretty break-words overflow-y-auto"
          value={changeUser}
          onChange={(e) => setChangeUser(e.target.value)}
        />
        <button
          type="button"
          className="flex btn btn-accent  rounded-2xl  w-[20%]"
          onClick={changeUsernameBtn}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ChangeUsername;
