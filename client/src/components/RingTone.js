import React, { useEffect } from "react";

import useSound from "use-sound";

//for ringtone when call is active call or receiving call , both for video and audio call
import videoRingingTone from "../animation/telephonering-6384.mp3";
const RingTone = () => {
  const [play, { stop, isPlaying }] = useSound(videoRingingTone);

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play, stop]);

  return null;
};

export default RingTone;
