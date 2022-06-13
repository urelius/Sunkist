import { useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

const Profiles = ({profiles, showEditProfiles, setShowEditProfiles, setProfiles}) => {
    const profileNameRef = useRef();
    const hidden = showEditProfiles ? '' : 'hidden';

    const createProfile = () => {
        if (profileNameRef.current.value) {
            invoke('create_profile', {profileName: profileNameRef.current.value});
            setProfiles([...profiles, profileNameRef.current.value]);
        }
    }

    return (
        <div class={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto h-screen bg-sky-600 ${hidden}`}>
            <table className="bg-white align-center w-80 m-auto mt-10">
                {profiles.map((profile, index) => {
                    return <tr className="p-2 block "><p>{profile}</p></tr>
                    }
                )}
            </table>
            <form className="m-auto block w-80 p-2 rounded" onSubmit={() => {}}>
                <input type="text" className="form-control p-2 rounded inline-block" ref={profileNameRef} placeholder="Enter profile name" />
                <button className="ml-2" onClick={(e) =>  {e.preventDefault(); createProfile()}}>
                    Add
                </button>
            </form>
            <button className="p-2 w-52 rounded mt-6 m-auto block" onClick={() => setShowEditProfiles(false)}>
                    Back to menu
            </button>
        </div>
    )
}

export default Profiles;