import React from "react";
import Lottie from "react-lottie";

import animationData from "../../animation/box_cat.json";

const BoxCat = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  return (
    <>

    <Lottie options={defaultOptions} style={{alignSelf: 'end', color: 'transparent'}} height={250} width={250} />

 

    
    </>
  );
};

export default BoxCat;
