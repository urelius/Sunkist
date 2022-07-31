import React, { useEffect, useState, useRef } from "react";
import { UserPlus, UserX, CornerDownLeft } from "react-feather";
import { iAcrobat } from "../imgs/classes";
import { Link } from "react-router-dom";

console.log(iAcrobat);
const Settings = () => {
  const [profiles, setProfiles] = useState([]);
  const profileNameRef = useRef();
  useEffect(() => {
    const getProfiles = async () => {
      const profiles = await window.api.getProfiles();
      setProfiles(profiles);
    };
    getProfiles();
  }, []);

  const removeProfile = (index) => {
    const newProfiles = [...profiles];
    newProfiles.splice(index, 1);
    setProfiles(newProfiles);
    window.api.setProfiles(newProfiles);
  };

  const createProfile = () => {
    const profileName = profileNameRef.current.value;
    if (!profiles.includes(profileName) && profileName.length > 1) {
      const newProfiles = [...profiles, profileName];
      setProfiles(newProfiles);
      window.api.setProfiles(newProfiles);
    }
  };

  // const profilesContent = () => {
  //   return profiles.map((current, index) => (
  //     <tr className="block m-2 w-full" key={index}>
  //       <td className="grow w-40">{current}</td>
  //       <td className="text-right">
  //         <UserX
  //           className="justify-right inline-block bg-red-600 hover:bg-red-700 rounded p-2 mb-1 text-white"
  //           size={32}
  //           onClick={() => removeProfile(index)}
  //         />
  //       </td>
  //     </tr>
  //   ));
  // };

  const profilesContent = () => {
    return profiles.map((current, index) => (
      <div className="flex flex-row">
        <img src={iAcrobat} width={24} />
        <div>{current}</div>
      </div>
    ));
  };

  return (
    <div id="Settings" className="flex-1 bg-slate-600 min-h-screen">
      <div className="flex flex-row h-screen">
        <div className="basis-1/2">98 df</div>
        <div className="grow overflow-y-scroll scrollable p-4">
          <h2 className="text-center text-xl text-white">Manage Profiles</h2>
          <div className="my-6 block text-center">
            <input
              ref={profileNameRef}
              className="text-slate-900 p-1 inline-block w-40 rounded-l h-9"
            />
            <UserPlus
              onClick={createProfile}
              className="inline-block bg-sky-600 hover:bg-sky-700 rounded-r p-2 mb-1 text-white"
              size={36}
            />
          </div>
          <table className="bg-white w-80 m-auto rounded py-4 px-10 block">
            <tbody>{profilesContent()}</tbody>
          </table>
        </div>
        <div className="flex flex-col w-9">
          <Link to="/" className="p-1">
            <CornerDownLeft className="text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
