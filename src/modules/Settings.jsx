import React, { useEffect, useState, useRef } from "react";
import { UserPlus, UserX, X, CornerDownLeft } from "react-feather";
import { Link } from "react-router-dom";
import iClasses from "../imgs/classes";

function Settings() {
  const [profiles, setProfiles] = useState([]);
  const [selectedClass, setSelectedClass] = useState("none");
  const [showClassSelection, setShowClassSelection] = useState(false);

  const profileNameRef = useRef();
  useEffect(() => {
    const getProfiles = async () => {
      const initProfiles = await window.api.getProfiles();
      setProfiles(initProfiles);
      window.api.setProfiles(initProfiles);
    };
    getProfiles();
  }, []);

  const createProfile = () => {
    const profileName = profileNameRef.current.value;
    const profile = { name: profileName, class: selectedClass };
    if (!profiles.includes(profile) && profileName.length > 1) {
      const newProfiles = [...profiles, profile];
      setProfiles(newProfiles);
      window.api.setProfiles(newProfiles);
      setShowClassSelection(false)
      profileNameRef.current.value = ''
    }
  };
  
  const removeProfile = (index) => {
    const newProfiles = [...profiles];
    newProfiles.splice(index, 1);
    setProfiles(newProfiles);
    window.api.setProfiles(newProfiles);
  };

  const profilesContent = () =>
    profiles.map((profile, index) => (
      <div className="flex flex-row" key={profile.name}>
          {profile.class !== "none"
            ? <img src={iClasses[profile.class]} className="h-9 w-9" />
            : <div className="h-9 w-9" />
          }
          <div className="flex-auto h-full mx-2 my-auto">{profile.name}</div>
          <UserX
            className="bg-red-600 flex-grow-0 hover:bg-red-700 rounded p-2 my-auto text-white"
            size={34}
            onClick={() => removeProfile(index)}
          />
      </div>
    ));

  const selectClassContainer = (
    <div className="mt-2 py-2 rounded bg-white align-middle grid grid-cols-8">
      <div className="hint col-span-6 col-start-2 mb-2">Choose your Character Class</div>
      <X
        className="col-span-1 cursor-pointer mx-auto p-1 text-grey-600 hover:text-red-600"
        size={24}
        onClick={() => {
          setSelectedClass('none');
          setShowClassSelection(false);
        }}
      />
      {Object.keys(iClasses).map((iClass, index) => (
        <img
          key={iClass}
          src={iClasses[iClass]}
          name={iClass}
          width={36}
          onClick={() => {
            setSelectedClass(iClass);
            setShowClassSelection(false);
          }}
          className={`selectClass font-thin mx-auto
            ${iClass !== selectedClass ? "greyClick" : ""}
            ${index === 0 ? "col-span-8" : ""}
            ${index !== 0 && index <= 4 ? "col-span-2 mb-2" : ""}
            ${index > 4 ? "col-span-1" : ""}
          `}
        />
      ))}
    </div>
  );

  return (
    <div id="Settings" className="flex-1 bg-slate-600 min-h-screen">
      <div className="flex flex-row h-screen">
        <div className="basis-1/2">98 df</div>
        <div className="grow overflow-y-scroll overflow-x-hidden scrollable p-4">
          <h2 className="text-center text-xl text-white">Manage Profiles</h2>
          <div className="mt-6 flex text-center">
            <div className="flex flex-col w-9">
              <img
                src={
                  selectedClass === "none"
                    ? iClasses.iVagrant
                    : iClasses[selectedClass]
                }
                width={36}
                className={`rounded-l selectClass ${
                  selectedClass === "none" && "greyClick"
                }`}
                onClick={() => setShowClassSelection(true)}
              />
            </div>
            <input
              ref={profileNameRef}
              placeholder="Enter a profilename ..."
              className="text-slate-900 p-2 border-l-2 flex-auto w-40 h-9"
            />
            <UserPlus
              onClick={createProfile}
              className="flex-none bg-sky-600 hover:bg-sky-700 p-2 rounded-r text-white"
              size={36}
            />
          </div>

          {showClassSelection && selectClassContainer}

          <div className="bg-white w-80 m-auto rounded mt-4 p-0.5 flex flex-col">
            {profilesContent()}
          </div>
        </div>
        <div className="flex flex-col w-9">
          <Link to="/" className="p-1">
            <CornerDownLeft className="text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
