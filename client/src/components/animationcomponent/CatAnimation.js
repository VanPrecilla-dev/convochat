import React from "react";
import Lottie from "react-lottie";

import animationData from "../../animation/cute-cat.json";

const CatAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  return (
    <>

    <Lottie  options={defaultOptions} height={300} width={300} />

    
    </>
  );
};

export default CatAnimation;
