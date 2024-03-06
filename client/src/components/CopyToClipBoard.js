import React, { useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Context } from "../context/AppContext";
import { FaCopy } from "react-icons/fa";

//component to copy the room name on the header part
const CopyToClipBoard = () => {
  //get the roomCall
  const { roomCall } = useContext(Context);

  //set if the text is being copied
  const [isTextCopied, setIsTextCopied] = useState(false);

  //set that the room name is to be copied
  const copyBtn = () => {
    setIsTextCopied(true);
  };

  return (
    <>
      <CopyToClipboard text={roomCall} onCopy={copyBtn}>
        {/* use tooltip to show that the icon can be used to copy the room name by clicking the button */}
        <div
          className="tooltip lg:tooltip-right tooltip-left text-white"
          data-tip="copy room name"
        >
          <button className="hover:bg-slate-400 rounded-lg invisible group-hover:visible absolute p-1">
            <FaCopy style={{ width: "25px" }} />
          </button>
        </div>
      </CopyToClipboard>
    </>
  );
};

export default CopyToClipBoard;
