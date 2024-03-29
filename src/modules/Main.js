import React, { useState, useEffect } from 'react';

import backgrounds from '../bgs';
import News from '../components/News'
import Events from '../components/Events'
import Launcher from '../components/Launcher'


const Main = () => {
    const [background, setBackground] = useState()

    useEffect(() => {
        setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)])
    }, []);
    
    return (
        <div style={{backgroundImage: `url(${background}`, backgroundSize: 'cover', backgroundPosition: 'center'}} id="main">
            <div className="shade min-h-screen">
                <div className="container flex m-auto py-10">
                    <div className="ml-4">
                        <Events />
                        <News />
                    </div>
                    <Launcher />
                </div>
            </div>
        </div>
    )
}


export default Main;