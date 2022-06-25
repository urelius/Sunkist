import React, { useEffect, useState } from 'react';
import { Users, Maximize2, Minimize2 } from 'react-feather';
import { Link } from 'react-router-dom';

import logo from '../flyffu.png'

const Launcher = () => {
    const [currentProfile, setCurrentProfile] = useState()
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        const getProfiles = async () => {
            const profiles = await window.api.getProfiles();
            setProfiles(profiles);
            setCurrentProfile(profiles[0] || '')
        }
        getProfiles()
    }, []);

    const changeProfile = (profile) => {
        setCurrentProfile(profile);
    }

    return (
        <div id="launcher" className="flex-1">
            <div className='flex-1 text-center'>
                <img src={logo} className="flyffLogo block m-auto pr-3" alt="Flyff Universe" />
                <div className="m-auto block mt-6">
                    <select id="profile" value={currentProfile} onChange={(e) => changeProfile(e.target.value)} className="text-slate-900 p-1 inline-block w-40 rounded-l">
                        {profiles.map((profile, index) => {
                            return <option key={index} value={profile}>{profile}</option>
                        }
                        )}
                    </select>
                    <Link to="/profiles">
                        <Users className="bg-sky-600 hover:bg-sky-700 rounded-r p-2 inline-block mb-1" size={36}/>
                    </Link>
                </div>
                <p>
                    <button type="button" className="bg-sky-600 p-2 w-52 rounded mt-6 hover:bg-sky-700" onClick={() => window.api.launchGame(currentProfile)}>
                        Play
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Launcher;