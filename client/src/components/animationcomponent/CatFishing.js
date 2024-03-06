import React from 'react'
import Lottie from "react-lottie";

import catFishing from "../../animation//cat_fishing.json";

const CatFishing = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: catFishing,
        renderer: "svg",
      };
    

  return (
    <>
         <Lottie  options={defaultOptions} height={100} width={100} />
    </>
  )
}

export default CatFishing