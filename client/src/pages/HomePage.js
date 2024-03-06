import { useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import ToggleTheme from "../components/ToggleTheme";
import JoinChat from "../components/convochat/JoinChat";

function Home() {
  const { lightMode } = useContext(Context);

  //always make sure upon reloading of this page all the store data in session storage is clear to avoid data erron on next action of user
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <>
      <div
        data-theme={lightMode ? "cupcake" : "dark"}
        className="min-h-screen justify-center "
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 m-auto relative  w-full flex flex-col">
          <ToggleTheme />
          <JoinChat />
        </div>
      </div>
    </>
  );
}

export default Home;
