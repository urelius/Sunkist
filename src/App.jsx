import { useEffect, useState, useRef } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { WebviewWindow} from '@tauri-apps/api/window'
import { Users } from 'react-feather';

import logo from './flyffu.png'
import './App.css'
import backgrounds from './bgs';
import Profiles from './Profiles';

function App() {
  const [background, setBackground] = useState()
  const [profiles, setProfiles] = useState([])
  const [currentProfile, setCurrentProfile] = useState()
  const [showEditProfiles, setShowEditProfiles] = useState(false)



  useEffect(() => { 
    const getProfiles = async () => {
      const profilePaths = await invoke('get_profile_paths')
      let profiles = 
        profilePaths.filter(path => path.split("#").length === 2)
        .filter(path => path.split("#")[1])
        .map(path => path.split("#")[1]);
      setProfiles(profiles)
    }
    const getActiveProfileName = async () => {
      const activeProfile = await invoke('get_active_profile');
      setCurrentProfile(activeProfile);
    }
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)])
    getProfiles()
    getActiveProfileName()
  }, [])

  useEffect(() => {
    invoke('switch_profile', {profileName: currentProfile});
  }, [currentProfile])

  const launchFlyff = async () => {
    const webview = new WebviewWindow(`Flyff${currentProfile}`, {
      title: 'Flyff Universe',
      url: 'https://universe.flyff.com/play'
    })

    webview.once('tauri://created', function () {
      webview.show()
    })
    
  }

  return (
    <div style={{backgroundImage: `url(${background}`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="App">
      <div className="shade">
        <header className="App-header">
          <img src={logo} className="flyffLogo" alt="Flyff Universe" />
          <div>
            <select id="profile" value={currentProfile} onChange={(e) => setCurrentProfile(e.target.value)} className="text-slate-900 p-1 inline-block w-40 rounded-l">
              {profiles.map((profile, index) => {
                return <option key={index} value={profile}>{profile}</option>
                }
              )}
            </select>
            <Users className="bg-sky-600 hover:bg-sky-700 rounded-r p-2 inline-block mb-1" size={46} onClick={() => setShowEditProfiles(true)}/>
          </div>
          <p>
            <button type="button" className="bg-sky-600 p-2 w-52 rounded mt-6 hover:bg-sky-700" onClick={() => launchFlyff()}>
              Play
            </button>
          </p>
        </header>
        <div className="col-span-4">
        </div>
      </div>
      <Profiles profiles={profiles} setShowEditProfiles={setShowEditProfiles} showEditProfiles={showEditProfiles} setProfiles={setProfiles} />
    </div>
  )
}

export default App
