import React, { useEffect, useState, useRef, useContext } from "react";

import { useStopwatch } from "react-timer-hook";
import { Context } from "../../context/AppContext";
import BoxCat from "../animationcomponent/BoxCat";
import phone_user from "../../animation/phone_user.png";
import phone_caller from "../../animation/phone_caller.png";
import RingTone from "../RingTone";
import AudioCalling from "../animationcomponent/AudioCalling";

const Audio = () => {
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
    setAudioCall,
  } = useContext(Context);

  //DOM node for audio calling
  const myVideo = useRef(null);

  //status if there is active call for ternary operations
  const [activeCall, setActiveCall] = useState(false);

  //for time of call
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: true,
  });

  //for detecting devices and set the media stream
  useEffect(() => {
    let mediaStream;

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
          console.log("running audio");
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

 //for starting the audio call and settingthat the active call is true then start the timer
  const audioHandler = () => {
     //call other user function from Context API
    callUser(me);
    //set true the activeCall
    setActiveCall(true);
      //start the timer
    start();
  };

  //ansswer the incoming audio call and resetthe timer
  const answerHandler = () => {
    //call accepted function from Context API
    answerCall();
    //reset to 00 the timer and restat again
    reset();
  };

  //to exit the Audio Room
  const exitAudio = () => {
    setAudioCall(false);
  };

  return (
    <>
      <div className="flex flex-col w-full pt-5 md:overflow-x-auto lg:overflow-x-auto">
        <div>
          {/* if no detected device or no permission to use the devices */}
          {noCamVideo && (
            <div className="flex mx-10 mt-5 absolute rounded-lg p-5 text-justify break-words text-balance text-white items-start bg-slate-500 ">
              <p ref={noVideo}>
                NO DETECTED DEVICE OR NO PERMISSION. <br /> <br />
                CONNECT YOUR DEVIDE AND/OR ALLOW AUDIO THEN RELOAD.
              </p>
            </div>
          )}

          {/* for user audio stream */}
          <div className="flex flex-col lg:flex-row gap-5 items-center w-full">
            <div className="flex grow h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover ">
              <div className="flex flex-col flex-1 gap-3 justify-center items-center  rounded-2xl border-2  border-gray-500 ">
                <img src={phone_user} alt="phone" className="flex  w-20 h-20" />
                <p className="flex top-20">Your Audio is ON</p>
                <video
                  className="rounded-full"
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  style={{ width: "50px" }}
                />
              </div>
            </div>

            {/* will show based on the status of when the receiving call and when the call is accepted */}
            {callAccepted && !callEnded ? (
              <div className="flex grow h-56 w-72 md:w-96 lg:h-96 lg:w-96 object-cover ">
                <div className="flex flex-col flex-1 gap-3 justify-center items-center  rounded-2xl border-2  border-gray-500 ">
                  <img
                    src={phone_caller}
                    alt="phone"
                    className="flex  w-20 h-20"
                  />
                  <p className="flex top-20">The Other Caller Audio is ON</p>
                  <video
                    className="rounded-full"
                    playsInline
                    ref={userVideo}
                    autoPlay
                    style={{ width: "50px" }}
                  />
                </div>

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

        {/* during the call, determine if the call is accepeted and ongoing or will end the call
          set here the ringing tone when calling and accepting will last almost 1 min but the call will still go on if not cancel or answer
          also there is audio animation and time when calling
        */}
        <div className="flex justify-center">
          {callAccepted && !callEnded ? (
            <button
              className="btn btn-error mt-5 py-2 text-white lg:text-xl"
              onClick={leaveCall}
            >
              End Call
            </button>
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
                      Cancel Audio Call
                    </button>
                  </div>

                  <div className="z--20 absolute text-white bottom-14 right-[-50px] md:bottom-16 md:right-[-50px]   lg:right-[-50px] lg:top-10 w-[350px]">
                    <AudioCalling />
                    <span className="font-mono z--20 absolute bottom-10 right-20 md:bottom-8 md:right-30 lg:right-20 lg:bottom-[10px] w-[230px]">
                      <span className="flex flex-row text-md ">
                        {hours} hrs, {minutes} mins, {seconds} secs
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-row py-5 justify-center gap-10">
                  {/* use only one button but use ternary opertaion to determine the onClick function and Text base on rceiving call or when the call is accepted */}
                  <button
                    className="btn btn-warning lg:text-xl"
                    onClick={
                      receivingCall && !callAccepted
                        ? () => answerHandler()
                        : () => audioHandler()
                    }
                  >
                    {receivingCall && !callAccepted ? (
                      <p>Answer Audio Call</p>
                    ) : (
                      <p>Start Audio Call</p>
                    )}
                  </button>
                  {receivingCall && !callAccepted && (
                    <div className="z--20 absolute  right-[-50px] top-[200px] md:right-[-40px] md:top-52 lg:right-[-80px] lg:top-20 w-[350px]">
                      <RingTone />
                      <AudioCalling />
                      <span className="font-mono z--20 absolute  right-[80px] bottom-[14px] md:bottom-10 md:right-24 lg:right-[100px] lg:bottom-[-20px] w-[230px]">
                        <span className="flex flex-row text-md ">
                          {hours} hrs, {minutes} mins, {seconds} secs
                        </span>
                      </span>
                    </div>
                  )}
                  {/* use only one button but use ternary opertaion to determing the onClick function and Text base on rceiving call or when the call is accepted */}
                  <button
                    className="btn btn-error lg:text-xl"
                    onClick={
                      receivingCall && !callAccepted ? leaveCall : exitAudio
                    }
                  >
                    {/* use only one button but use ternary opertaion to determing the onClick function and Text base on rceiving call or when the call is accepted */}
                    {receivingCall && !callAccepted ? (
                      <p>Cancel Call</p>
                    ) : (
                      <p>Exit Audio Room</p>
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

export default Audio;
