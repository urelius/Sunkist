import React, { useState, useEffect } from "react";

import backgrounds from "../imgs/bgs";
import News from "../components/News";
import Launcher from "../components/Launcher";

function Main() {
  const [background, setBackground] = useState();

  useEffect(() => {
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id="main"
    >
      <div className="shade min-h-screen">
        <div className="container flex m-auto py-10">
          <News />
          <Launcher />
        </div>
      </div>
    </div>
  );
}

export default Main;
