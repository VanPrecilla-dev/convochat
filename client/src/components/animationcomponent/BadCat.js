import React from "react";
import Lottie from "react-lottie";

import animationData from "../../animation/bad_cat.json";

const BadCat = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  return (
    <>

    <Lottie  options={defaultOptions} style={{position:'absolute', alignSelf: 'end'}} height={100} width={100} />

    
    </>
  );
};

export default BadCat;
