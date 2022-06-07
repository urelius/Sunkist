import { useEffect, useState } from 'react'
import { WebviewWindow } from '@tauri-apps/api/window'
import logo from './flyffu.png'
import './App.css'
import backgrounds from './bgs';

function App() {
  const [background, setBackground] = useState()
  const [clientProfile, setClientProfile] = useState(0)

  useEffect(() => {
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)])
  }, [])

  const launchFlyff = () => {
    setClientProfile(clientProfile+1);
    const webview = new WebviewWindow(`Flyff${clientProfile}`, {
      title: 'Flyff Universe',
      url: 'https://universe.flyff.com/play'
    })

    webview.once('tauri://created', function () {
      webview.show()
    })
    
  }

  return (
    <div style={{backgroundImage: `url(${background}`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="App">
      <header className="App-header">
        <img src={logo} className="flyffLogo" alt="Flyff Universe" />
        <p>
          <button type="button" className="bg-sky-600 p-2 w-52 rounded mt-6 hover:bg-sky-700" onClick={() => launchFlyff()}>
            Play
          </button>
        </p>
      </header>
      <div className="col-span-4 bg-slate-200">

      </div>
    </div>
  )
}

export default App
