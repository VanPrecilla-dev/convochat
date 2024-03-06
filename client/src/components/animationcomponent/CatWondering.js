import React from "react";
import Lottie from "react-lottie";

import animationData from "../../animation/cat_wondering.json";

const CatWondering = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  return (
    <>

    <Lottie  options={defaultOptions} height={100} width={100} />

    
    </>
  );
};

export default CatWondering;
