import React, { useEffect, useState, useRef } from 'react';
import { UserPlus, UserX, CornerDownLeft } from 'react-feather';
import { Link } from 'react-router-dom';

import logo from '../flyffu.png'

const Profile = () => {
    const [profiles, setProfiles] = useState([])
    const profileNameRef = useRef();
    useEffect(() => {
        const getProfiles = async () => {
            const profiles = await window.api.getProfiles();
            setProfiles(profiles);
        }
        getProfiles()
    }, []);

    const removeProfile = (index) => {  
        const newProfiles = [...profiles];
        newProfiles.splice(index, 1);
        setProfiles(newProfiles);
        window.api.setProfiles(newProfiles);
    }

    const createProfile = () => { 
        const profileName = profileNameRef.current.value;
        if (!profiles.includes(profileName) && profileName.length > 1) {
            const newProfiles = [...profiles, profileName];
            setProfiles(newProfiles);
            window.api.setProfiles(newProfiles);
        }
    }

    const profilesContent = () => {
        return profiles.map((current, index) => (
            <tr className='block m-2 flex w-full' key={index}>
                <td className='grow w-40'>{current}</td>
                <td className='text-right'>
                    <UserX 
                        className="justify-right inline-block bg-red-600 hover:bg-red-700 rounded p-2 inline-block mb-1 text-white" size={32}
                        onClick={() => removeProfile(index)}
                        /> 
                </td>
            </tr>
        ));
    }


    return (
        <div id="profile" className="flex-1 bg-slate-600 min-h-screen">
            <div className='container block m-auto py-4'>
                <div>
                    <Link to="/">
                        <CornerDownLeft className="inline-block absolute text-white"/>
                    </Link>
                    <h2 className='text-center text-xl text-white'>Profiles</h2>
                    <div className='my-6 block text-center'>
                        <input ref={profileNameRef} className="text-slate-900 p-1 inline-block w-40 rounded-l h-9" />
                        <UserPlus onClick={createProfile} className="inline-block bg-sky-600 hover:bg-sky-700 rounded-r p-2 inline-block mb-1 text-white" size={36}/>
                    </div>
                </div>
                <table className='bg-white w-80 m-auto rounded py-4 px-10 block'>
                    <tbody>
                        {profilesContent()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profile;