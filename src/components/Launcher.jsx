import React, { Profiler, useEffect, useState } from "react";
import { Settings } from "react-feather";
import { Link } from "react-router-dom";
import logo from "../imgs/flyffu.png";

function Launcher() {
  const [currentProfile, setCurrentProfile] = useState();
  const [profiles, setProfiles] = useState([]); // { name: '', class: '' }

  useEffect(() => {
    const getProfiles = async () => {
      const allProfiles = await window.api.getProfiles();
      /// //////////////////////////////////////////////////
      // breaking Change fix: moving the old profilenames //
      //                   into the new profile object as //
      //                    name and id (to keep profile) //
      /// ////////////////////// Remove in newer Version ///
      if (allProfiles.some((e) => typeof e === "string")) {
        allProfiles.forEach((name, index) => {
          if (typeof name === "string") {
            profiles[index] = { name, class: "iVagrant", id: name };
          }
        });
      }
      window.api.setProfiles(allProfiles);
      /// ////////////////////// Remove in newer Version ///
      /// //////////////////////////////////////////////////
      setProfiles(allProfiles);
      setCurrentProfile(allProfiles[0] || "");
    };
    getProfiles();
  }, []);

  return (
    <div id="launcher" className="flex-1">
      <div className="flex-1 text-center">
        <img
          src={logo}
          className="flyffLogo block m-auto pr-3"
          alt="Flyff Universe"
        />
        <div className="m-auto flex mt-6 w-56">
          <select
            id="profile"
            value={currentProfile?.id}
            onChange={(e) => setCurrentProfile(profiles.find(p => p.id === e.target.value))}
            className="text-slate-900 p-2 flex-auto w-40 rounded-l"
          >
            {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
          </select>
          <Link to="/settings">
            <Settings
              className="bg-sky-600 hover:bg-sky-700 rounded-r p-2 flex-none"
              size={36}
            />
          </Link>
        </div>
        <div className="m-auto flex w-56">
          <button
            type="button"
            className="bg-sky-600 p-2 flex-auto rounded mt-6 hover:bg-sky-700"
            onClick={() => window.api.launchGame(currentProfile)}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default Launcher;
