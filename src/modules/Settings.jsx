import React, { useEffect, useState } from 'react';
import {
  UserPlus, UserX, X, Trash2, CornerDownLeft, Square, CheckSquare,
} from 'react-feather';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import iClasses from '../imgs/classes';

function Settings() {
  const [profiles, setProfiles] = useState([]); // { name: '', class: '' }
  const [selectedClass, setSelectedClass] = useState('none');
  const [showClassSelection, setShowClassSelection] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState();
  const [errorText, setErrorText] = useState('');
  const [newProfileName, setNewProfileName] = useState('');

  useEffect(() => {
    const getProfiles = async () => {
      const initProfiles = await window.api.getProfiles();
      setProfiles(initProfiles);
      window.api.setProfiles(initProfiles);
    };
    getProfiles();
  }, []);

  const createProfile = () => {
    if (newProfileName.length > 24) {
      setErrorText('Profilename cannot be more than 24 characters.');
      return;
    }
    if (profiles.some((profile) => profile.name.includes(newProfileName))) {
      setErrorText('Duplicate profilename. Try again!');
      return;
    }
    setErrorText('');
    const profile = { name: newProfileName, class: selectedClass, id: uuidv4() };
    const newProfiles = [...profiles, profile];
    setProfiles(newProfiles);
    window.api.setProfiles(newProfiles);
    setShowClassSelection(false);
    setSelectedClass('none');
    setNewProfileName('');
  };

  const removeProfile = (index) => {
    const newProfiles = [...profiles];
    newProfiles.splice(index, 1);
    setProfileToDelete();
    setProfiles(newProfiles);
    window.api.setProfiles(newProfiles);
  };

  const profilesContent = () => profiles.map((profile, index) => (
    index !== profileToDelete
      ? (
        <div className="flex flex-row h-9" key={profile.name}>
          {profile.class !== 'none'
            ? <img src={iClasses[profile.class]} className="h-9 w-9" />
            : <div className="h-9 w-9" />}
          <div className="flex flex-auto items-center mx-2">{profile.name}</div>
          <UserX
            className="bg-red-600 hover:bg-red-700 rounded p-2 content-center my-auto text-white"
            size={34}
            onClick={() => setProfileToDelete(index)}
          />
        </div>
      )
      : (
        <div className="flex flex-row h-9" key={profile.name}>
          <Trash2
            className="bg-red-600 hover:bg-red-700 rounded p-2 my-auto text-white"
            size={34}
            onClick={() => removeProfile(index)}
          />
          <div className="flex flex-auto hint items-center mx-2 text-xs">
            <b>
              Delete profile &apos;
              {profile.name}
              &apos; ?

            </b>
          </div>
          <X
            className="bg-red-600 hover:bg-red-700 rounded p-2 my-auto text-white"
            size={34}
            onClick={() => setProfileToDelete()}
          />
        </div>
      )
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
            ${iClass !== selectedClass ? 'greyClick' : ''}
            ${index === 0 ? 'col-span-8' : ''}
            ${index !== 0 && index <= 4 ? 'col-span-2 mb-2' : ''}
            ${index > 4 ? 'col-span-1' : ''}
          `}
        />
      ))}
    </div>
  );

  return (
    <div id="Settings" className="flex-1 bg-slate-600 min-h-screen">
      <div className="flex flex-row h-screen">
        <div className="basis-7/12 overflow-y-scroll overflow-x-hidden scrollable p-4">
          <h2 className="text-center text-xl text-white">Settings</h2>
          <div className="mt-6 flex text-center">
            <Square className="square" />
            <CheckSquare className="square checkedSquare" />
          </div>
        </div>
        <div className="basis-5/12 overflow-y-scroll overflow-x-hidden scrollable p-4">
          <h2 className="text-center text-xl text-white">Manage Profiles</h2>
          <div className="mt-6 flex text-center">
            <div className="flex flex-col w-9">
              <img
                src={
                  selectedClass === 'none'
                    ? iClasses.iVagrant
                    : iClasses[selectedClass]
                }
                width={36}
                className={`rounded-l selectClass ${
                  selectedClass === 'none' && 'greyClick'
                }`}
                onClick={() => setShowClassSelection(!showClassSelection)}
              />
            </div>
            <input
              value={newProfileName}
              onInput={(e) => setNewProfileName(e.target.value)}
              placeholder="Enter a profilename ..."
              className="text-slate-900 p-2 border-l-2 flex-auto w-40 h-9"
            />
            <UserPlus
              onClick={newProfileName !== '' ? createProfile : null}
              className={`flex-non p-2 rounded-r text-white  ${
                newProfileName !== '' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-slate-400'
              }`}
              size={36}
            />
          </div>
          {
            errorText !== '' && (
            <div className="bg-white errorText m-auto rounded mt-2 p-2 flex flex-col">
              {errorText}
            </div>
            )

          }
          {showClassSelection && selectClassContainer}
          <div className="bg-white m-auto rounded mt-4 p-0.5 flex flex-col">
            {profilesContent()}
          </div>
        </div>
        <div className="flex flex-col w-12">
          <X size={32} className="text-gray-500 m-2 mb-6" />
          { [...Array(6)].map(() => <div className="w-12 h-12" />) }
          <Link to="/">
            <CornerDownLeft size={32} className="text-white m-2 hover:text-orange-400 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
