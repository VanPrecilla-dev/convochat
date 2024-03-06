import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../context/AppContext";
import CatAnimation from "../animationcomponent/CatAnimation";

const JoinChat = () => {
  //consume the contextAPI
  const { socket, info, setInfo, setMember, lightMode, full } =
    useContext(Context);
  const { username, room } = info;

  //redirect to other path
  const navigate = useNavigate();

  //function for joining the room via the input
  const joinRoom = async () => {
    //set first the time to store in data below
    const currentTime = new Date();
    const timeString = currentTime.getHours() + ":" + currentTime.getMinutes();

    /* check if username and room is not empty */
    if (info.username !== "" && info.room !== "") {
      console.log(info);
      //store first the username to sessionStorage so that this will be logged even after reload or rerender
      //can be used also to other room if not deleted
      sessionStorage.setItem("username", JSON.stringify(username));

      //get first if there is existing userList on Session Storage
      const getDataUser = sessionStorage.getItem("userList");
      const getDataUserParse = JSON.parse(getDataUser) || [];

      //then set the newly added object with the previous store data to session storage
      sessionStorage.setItem(
        "userList",
        JSON.stringify([
          ...getDataUserParse,
          {
            connectedUser: true,
            username: info.username,
            room: room,
            time: timeString,
          },
        ])
      );

      //store in a variable, to show in member view
      setMember([
        ...getDataUserParse,
        {
          connectedUser: true,
          username: info.username,
          room: room,
          time: timeString,
        },
      ]);

      //reidrect to main convochat page and their will join the room and check if the room is full
      navigate(`/room/${room}`);
      
      //to communicate with the server that the new user joined and inform the other user thru this also
      socket.emit("joinRoom", info);
    } else {
      //will show if either username or room is empty
      alert("Need Username and Room Name Before you Enter ConvoChat");
    }
  };

  //handling the input box for username and room
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({ ...info, [id]: value });
  };

  return (
    <>
      <div className="flex flex-col justify-center pt-40 lg:pt-36">
        {/* design animation */}
        <div className="z-20 absolute md:left-[200px] left-[15px] top-[-6px] lg:left-[380px] lg:top-[25px] w-[350px]">
          <CatAnimation />
        </div>

        {/* form for entering room or creating new room */}
        <form
          onSubmit={joinRoom}
          className={`flex flex-col lg:w-4/12 w-80 m-auto ${
            lightMode ? "text-gray-00 , bg-blue-200" : "text-white "
          }  justify-center text-center  border-white rounded-2xl shadow-inner shadow-sky-200 gap-9 p-10`}
        >
          <h1 className="text-2xl font-bold">ConvoChat Room</h1>
          <input
            type="text"
            className="input input-bordered border-white w-full"
            placeholder="Enter Username. Ex: Juan..."
            id="username"
            value={username || ""}
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="text"
            className="input input-bordered border-white w-full"
            placeholder="Enter Room Name/Id..."
            id="room"
            value={room || ""}
            onChange={(e) => handleChange(e)}
            required
          />
          <button className="btn bg-red-500 w-full mx-auto text-xl text-white hover:bg-gray-500">
            Enter Room
          </button>

          {/* will show if the room is full and notify the user the reason why he/she cannot enter the room */}
          <div className="flex text-center justify-center">
          {full && <p>Sorry the room is full now. <br /> Kindly enter the other room or create new room.<br />
          Please take note room name is case sensitive.
          </p>}
        </div>
        </form>

    
      </div>
    </>
  );
};

export default JoinChat;
