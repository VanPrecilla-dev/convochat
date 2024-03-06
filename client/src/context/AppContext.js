import React, { createContext, useState, useEffect, useRef } from "react";

import io from "socket.io-client";
import Peer from "simple-peer";


/* 
UNCOMMENT THIS WHEN YOU ARE RUNNING THIS CHAT APP LOCALLY AND COMMENT BELOW IF NOT
const socket = io.connect( "http://localhost:3001", {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Number of reconnection attempts
}); */

const socket = io.connect( "https://convochat-server.vercel.app/", {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Number of reconnection attempts
});

export const Context = createContext(null);

const AppContext = ({ children }) => {
  //check first if the Context is passing data correctly
  if (Context === null) {
    console.error("null value");
  } else {
    console.log("successful established of contextApi");
  }

  //use to connect to room
  const [info, setInfo] = useState([
    {
      username: "",
      room: "",
    },
  ]);

  const [usernameStore, setUsernameStore] = useState("");

  //use for video and audio calling, connecting peers
  const [member, setMember] = useState([]);
  const [disconnectUser, setDisconnectUser] = useState([]);
  const [me, setMe] = useState("");
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [noCamVideo, setNoCamVideo] = useState(false);
  const [roomCall, setRoomCall] = useState("");
  const [notifCallEnded, setNotifCallEnded] = useState(false);

  //use for opening of video and audio room respectively
  const [openVideoCall, setOpenVideoCall] = useState(false);
  const [openAudioCall, setAudioCall] = useState(false);

  //use for accepting an incoming call if it is video or audio
  const [videoAccepted, setVideoAccepted] = useState(false);
  const [audioAccepted, setAudioAccepted] = useState(false);

  //use for security for one on one conversation, checking the number of online user in the room
  const [full, setFull] = useState(false);

  //use for reconnecting the socket.oio
  const [reconnect, setReconnect] = useState(false);
  const [currentMessage, setCurrentMsg] = useState("");

  //use for sending message
  const [messageList, setMessageList] = useState([]);

  //use for video and audio calling, create nodes in DOM
  const userVideo = useRef(null); //to display video or audio of other user, remote
  const connectionRef = useRef(null); //use for saving peer to peer connection using simple-peer
  const myVideo = useRef(null); //to display video or audio of the user

  const noVideo = useRef(null); //to display video error


//function for getting the store theme object from localstorage if exist and stor eit as intial value of the lightmode
//this persist even the page is reloaded 
//the design will follow according to this
  const [lightMode, setLightMode] = useState(() => {
    const existingLightModeStatus = localStorage.getItem("lightMode");
    const existingLightModeStatusParse = existingLightModeStatus
      ? JSON.parse(existingLightModeStatus)
      : false;
    return existingLightModeStatusParse;
  }); //set lighTmode

  //function for theme toggle
  const lightModeToggle = () => {
    setLightMode(!lightMode);
  };

  //to store lightmode status to local storage automatically when there is changes on the lightmode variable
  useEffect(() => {
    const handleLocalStorage = () => {
      localStorage.setItem("lightMode", lightMode);
    };
    handleLocalStorage();
  }, [setLightMode, lightMode]);

  //get userName in local storage and store it automatically on every render to userNameStore variable
  //this will reflect automatically when there is changes on the dependecy below
  useEffect(() => {
    const user = sessionStorage.getItem("username");
    setUsernameStore(JSON.parse(user));
    console.log("I", usernameStore);
  }, [usernameStore, setUsernameStore, setInfo, info.username]);

  //for listening for the call from the other party, this will come from the server
  useEffect(() => {
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("call_User", (data) => {
      setReceivingCall(true);
      setIdToCall(data.userToCall);
      console.log(data.userToCall);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, [myVideo, setCaller, setCallerSignal, setName, setReceivingCall]);


    //for listening for the end call from the other party, this will come from the server
  useEffect(() => {
    socket.on("callDisconnected", () => {
      setNotifCallEnded(true);
      setTimeout(() => {
        leaveCall();
      }, 1000);
    });
  }, []);

  useEffect(() => {
    //for listening to sent msg from the other party and store it on messageList variable , this will come from the server
    socket.on("receiveMessage", (messageData, received) => {
      setMessageList((list) => [
        ...list,
        { receivedMsg: received, messageData: messageData },
      ]);
      console.log("received", messageList);
    });
  }, [setMember, setMessageList]);


  useEffect(() => {
    //store the latest time upon runncing this code
    const currentTime = new Date();
    const timeString = currentTime.getHours() + ":" + currentTime.getMinutes();

    //get the existing data from the sessionStorage of the client web browser
    const getDataUser = sessionStorage.getItem("userList");
    const getDataUserParse = JSON.parse(getDataUser) || [];

    //for listening to newly joined member from the other party, this will come from the server
    //store the data received thru this sockect to userList variable and store it on session Storage
    socket.on("joinMember", (data) => {
      sessionStorage.setItem(
        "userList",
        JSON.stringify([
          ...getDataUserParse,
          {
            connectedUser: true,
            username: data.username,
            room: data.room,
            time: timeString,
          },
        ])
      );
      setMember([
        ...getDataUserParse,
        {
          connectedUser: true,
          username: data.username,
          room: data.room,
          time: timeString,
        },
      ]);
    });

    //for listening for edit username data from the other party, this will come from the server
    //store the data received thru this sockect to userList variable and store it on session Storage
    socket.on("editUsername", (data) => {
      sessionStorage.setItem(
        "userList",
        JSON.stringify([
          ...getDataUserParse,
          {
            connectedUser: data.connectedUser,
            username: data.username,
            room: data.room,
            oldUsername: data.oldUsername,
            editUsername: data.editUsername,
          },
        ])
      );

      setMember([
        ...getDataUserParse,
        {
          connectedUser: data.connectedUser,
          username: data.username,
          room: data.room,
          oldUsername: data.oldUsername,
          editUsername: data.editUsername,
          time: timeString,
        },
      ]);
    });

    //for listening for disconnected other user, this will come from the server
    //store the data received thru this sockect to userList variable and store it on session Storage
    socket.on("exitUser", (data) => {
      sessionStorage.setItem(
        "userList",
        JSON.stringify([
          ...getDataUserParse,
          {
            disconnectedUser: true,
            username: data.username,
            room: data.room,
            time: timeString,
          },
        ])
      );
      setMember([
        ...getDataUserParse,
        {
          disconnectedUser: true,
          username: data.username,
          room: data.room,
          time: timeString,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    //handle undexpected abort call, will reload to refresh socket.id connection
    window.addEventListener("beforeunload", handleBeforeUnload);

    //clean-up when component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //function to call the other online party, accept parameter from video & audio component, the socket.id of myVideo user
  const callUser = (id) => {
    //make new Peer
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log("signal caller", data);
      socket.emit("call_User", {
        userToCall: id,
        room: info.room || roomCall,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      // Set remote stream, for the other online party
      userVideo.current.srcObject = stream;
    });

    //listen when the call is answered and connect the call
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    //store the newly created peer to DOM
    console.log("idToCall ", idToCall);
    connectionRef.current = peer;
  };

  //function for answering the call in the room
  const answerCall = () => {
    //set that the call is answered
    setCallAccepted(true);

    //make new peer for the other party
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      console.log("signal data", data);
      console.log("caller", caller);

      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    //connecting the call
    peer.signal(callerSignal);
    connectionRef.current = peer;

    //for debuging the signal
    console.log(`caller ${caller} signal ${callerSignal}`);
  };

  //for ending the call and closing the connection to make a clean-up or follow-up logic or call again
  function leaveCall() {
    setCallEnded(true);
    if (connectionRef.current) connectionRef.current.destroy();
    setMe("");
    setStream(null);
    setReceivingCall(false);
    setCaller("");
    setCallerSignal({});
    setCallAccepted(false);
    setIdToCall("");
    setCallEnded(false);
    setName("");
    setNoCamVideo(false);
    userVideo.current = null;
    setOpenVideoCall(false);
    setAudioCall(false);
    setVideoAccepted(false);
    setAudioAccepted(false);
    setFull(false);
    window.location.reload();
    socket.emit("gotDisconnected", roomCall);
  }

  //handle undexpected abort call
  function handleBeforeUnload(e) {
    e.returnValue = ""; //required for chrome
    leaveCall();
  }

  return (
    //wrapping the props children to pass the data to all components and will use the useContect to consume the data in the components
    <Context.Provider
      value={{
        socket,
        lightModeToggle,
        info,
        setInfo,
        member,
        setMember,

        me,
        setMe,
        stream,
        setStream,
        receivingCall,
        setReceivingCall,
        caller,
        setCaller,
        callerSignal,
        setCallerSignal,
        callAccepted,
        setCallAccepted,
        idToCall,
        setIdToCall,
        callEnded,
        setCallEnded,
        name,
        setName,
        noCamVideo,
        setNoCamVideo,
        roomCall,
        setRoomCall,
        userVideo,
        connectionRef,
        myVideo,
        noVideo,

        callUser,
        answerCall,
        leaveCall,
        setFull,
        full,
        messageList,
        setMessageList,
        reconnect,
        setReconnect,
        currentMessage,
        setCurrentMsg,
        notifCallEnded,
        setNotifCallEnded,
        openVideoCall,
        setOpenVideoCall,
        openAudioCall,
        setAudioCall,
        videoAccepted,
        setVideoAccepted,
        audioAccepted,
        setAudioAccepted,
        lightMode,
        setLightMode,
        usernameStore,
        setUsernameStore,
        disconnectUser,
        setDisconnectUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
