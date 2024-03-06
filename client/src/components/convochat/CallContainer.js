import React, { useContext, useEffect } from "react";
import Video from "./Video";
import Audio from "./Audio";

import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

import { Context } from "../../context/AppContext";

const CallContainer = () => {
  const {
    socket,
    receivingCall,
    roomCall,
    openVideoCall,
    setOpenVideoCall,
    openAudioCall,
    setAudioCall,
    videoAccepted,
    setVideoAccepted,
    audioAccepted,
    setAudioAccepted,
    notifCallEnded,
    setNotifCallEnded,
  } = useContext(Context);

  //internal CSS style for react-icons
  const iconStyle = { width: "50px", height: "50px" };

  const videoCallBtn = () => {
    setOpenVideoCall(true);

    socket.emit("videoCall", roomCall);
  };

  useEffect(() => {
    socket.on("videoAccepted", () => {
      setVideoAccepted(true);
    });
  }, [socket, openVideoCall]);

  const audioCallBtn = () => {
    setAudioCall(true);
    socket.emit("audioCall", roomCall);
  };

  useEffect(() => {
    socket.on("audioAccepted", () => {
      setAudioAccepted(true);
    });
  }, [socket, openAudioCall]);

  const notiCallEndedBtn = () => {
    setNotifCallEnded(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 pb-5 m-auto relative  w-full flex flex-col gap-2 md:overflow-x-clip lg:overflow-x-clip">
      {notifCallEnded && (
        <div className="flex absolute rounded-lg p-5 text-justify break-words text-balance text-white items-start bg-slate-400 ">
          <p>"end your call, other party got disconnected"</p>
          <button onClick={notiCallEndedBtn}>OK</button>
        </div>
      )}

      {openVideoCall || openAudioCall ? (
        /* to start a call */
        <div className="flex">
          {openVideoCall && <Video />}
          {openAudioCall && <Audio />}
        </div>
      ) : (
        /* when receiving call and anwsering call */
        <div className="flex flex-row justify-center items-center ">
          <div className="text-white">
            {receivingCall ? (
              <div className="caller flex flex-col">
                {videoAccepted && <Video />}
                {audioAccepted && <Audio />}
              </div>
            ) : (
              <>
                {/* default look, open the video or audio room */}
                <div className="flex flex-row  gap-3 self-center  item-center  p-2">
                  <button
                    type="button"
                    className="bg-blue-500 py-4 px-6 lg:px-10 w-24 lg:w-32 rounded-2xl items-center hover:bg-slate-500"
                    onClick={videoCallBtn}
                  >
                    <FaVideo className="" style={iconStyle} />
                  </button>
                  <button
                    typeof="button"
                    className="bg-green-500 py-4 px-6 lg:px-10 w-24 lg:w-32 rounded-2xl  items-center hover:bg-slate-500"
                    onClick={audioCallBtn}
                  >
                    <IoCall style={iconStyle} />
                  </button>{" "}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallContainer;
