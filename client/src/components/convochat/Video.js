import React, { useEffect, useState, useRef, useContext } from "react";

import { Context } from "../../context/AppContext";

import BoxCat from "../animationcomponent/BoxCat";
import VideoCalling from "../animationcomponent/VideoCalling";

import { useStopwatch } from "react-timer-hook";
import RingTone from "../RingTone";

const Video = () => {
  const {
    me,
    setStream,
    receivingCall,
    callAccepted,
    idToCall,
    callEnded,
    noCamVideo,
    setNoCamVideo,
    userVideo,
    noVideo,
    callUser,
    answerCall,
    leaveCall,
    setOpenVideoCall,
  } = useContext(Context);

  const myVideo = useRef(null);

  const [activeCall, setActiveCall] = useState(false);



  const {
    seconds,
    minutes,
    hours,
    start,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    let mediaStream;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          console.log("running video");
          mediaStream = stream;
        } else {
          console.error("error display");
        }
      })
      .catch((error) => {
        setNoCamVideo(true);
      });

    return () => {
      // Stop all tracks in the media stream if it's defined
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const videoHandler = () => {
    callUser(me);
    setActiveCall(true);
    start();

  };

  const answerHandler = () => {
    answerCall();
    reset();
 
  };

  const exitVideo = () => {
    setOpenVideoCall(false);
  };


  return (
    <>
      <div className="flex flex-col w-full pt-5 md:overflow-x-auto lg:overflow-x-auto">
        <div>
          {noCamVideo && (
            <div className="flex mx-10 mt-5 absolute rounded-lg p-5 text-justify break-words text-balance text-white items-start bg-slate-500 ">
              <p ref={noVideo}>
                NO DETECTED DEVICE OR NO PERMISSION. <br /> <br />
                CONNECT YOUR DEVIDE AND/OR ALLOW CAMERA AND AUDIO THEN RELOAD.
              </p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-5 items-center w-full">
            <div className="flex grow h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover ">
              <video
                className="flex rounded-2xl h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover"
                playsInline
                muted
                ref={myVideo}
                autoPlay
              />
            </div>

            {callAccepted && !callEnded ? (
              <div className="flex grow h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover ">
                <video
                  className=" flex rounded-2xl h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover"
                  playsInline
                  ref={userVideo}
                  autoPlay
                />
                <span className="font-mono z--20 absolute bottom-4 right-10 md:bottom-5 md:right-30 lg:right-14 lg:bottom-[10px] w-[70px]">
                  <span className="flex flex-row text-md ">
                    {hours} hrs, {minutes} mins, {seconds} secs
                  </span>
                </span>
              </div>
            ) : (
              <div className="flex h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover items-end rounded-2xl border-2  border-gray-500 ">
                <BoxCat />
                <span className="invisible">{idToCall}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          {callAccepted && !callEnded ? (
            <>
              <button
                className="btn btn-error mt-5 py-2 text-white lg:text-xl"
                onClick={leaveCall}
              >
                End Call
              </button>
          
            </>
          ) : (
            <div>
              {activeCall ? (
                <>
                  <div className="flex py-4 justify-center">
                    <RingTone />
                    <button
                      className="btn btn-error lg:text-xl"
                      onClick={leaveCall}
                    >
                      Cancel Video Call
                    </button>
                  </div>

                  <div className="z--20 absolute text-white bottom-14 right-[-50px] md:bottom-16 md:right-[-50px]   lg:right-[-50px] lg:top-10 w-[350px]">
                    <VideoCalling />
                    <span className="font-mono z--20 absolute bottom-10 right-20 md:bottom-8 md:right-30 lg:right-20 lg:bottom-[10px] w-[230px]">
                      <span className="flex flex-row text-md ">
                        {hours} hrs, {minutes} mins, {seconds} secs
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-row py-5 justify-center gap-10">
                  <button
                    className="btn btn-warning lg:text-xl"
                    onClick={
                      receivingCall && !callAccepted
                        ? () => answerHandler()
                        : () => videoHandler()
                    }
                  >
                    {receivingCall && !callAccepted ? (
                      <p>Answer Call</p>
                    ) : (
                      <p>Start Video Call</p>
                    )}
                  </button>
                  {receivingCall && !callAccepted && (
                    <div className="z--20 absolute  right-[-50px] top-[200px] md:right-[-40px] md:top-52 lg:right-[-80px] lg:top-20 w-[350px]">
                       <RingTone />
                      <VideoCalling />
                      <span className="font-mono z--20 absolute  right-[80px] bottom-[14px] md:bottom-10 md:right-24 lg:right-[100px] lg:bottom-[-20px] w-[230px]">
                        <span className="flex flex-row text-md ">
                          {hours} hrs, {minutes} mins, {seconds} secs
                        </span>
                      </span>
                    </div>
                  )}

                  <button
                    className="btn btn-error lg:text-xl"
                    onClick={
                      receivingCall && !callAccepted ? leaveCall : exitVideo
                    }
                  >
                    {receivingCall && !callAccepted ? (
                      <p>Cancel Call</p>
                    ) : (
                      <p>Exit Video Room</p>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Video;
