import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import backgrounds from '../imgs/bgs';
import News from '../components/News';
import Launcher from '../components/Launcher';

function Main() {
  const [background, setBackground] = useState();

  useEffect(() => {
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  return (
    <div
      style={{
        backgroundImage: background && `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      id="main"
    >
      <div className="shade min-h-screen">
        <div className="container flex m-auto py-10">
          <News />
          <Launcher />
        </div>
      </div>
      <X size={32} id="closeWindow" onClick={() => window.api.closeWindow()} className="absolute top-0 closeButton right-0 m-2 hover:animate-pulse" />
    </div>
  );
}

export default Main;
