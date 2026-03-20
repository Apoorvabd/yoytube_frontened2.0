import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/UserContext";
import { GiCrossedBones } from "react-icons/gi";

function UsersSettings() {
  const { setUsersSettings } = useContext(DataContext);
  const navigate = useNavigate();

  const go = (path) => {
    setUsersSettings(false);
    navigate(path);
  };

  return (
    <div className="flex justify-center items-center h-[100%] mt-12 mb-12">

      {/* main container */}
      <div className="w-[85%] h-[95%] bg-neutral-200 rounded-2xl shadow-2xl flex p-4 animate-fade-up">

        {/* left navigation */}
        <div className="w-80 bg-neutral-150 flex flex-col items-center pt-12 border-r border-neutral-800">

          <h2 className="text-3xl font-bold text-black mb-10 tracking-wide">
            Settings
          </h2>

          <nav className="flex flex-col text-black gap-4 w-full px-8">

            <button className="navBtn" onClick={() => go("/General")}>
              General
            </button>

            <button className="navBtn" onClick={() => {navigate("/login")}}>
              Switch Account
            </button>

            <button className="navBtn" onClick={() => go("/notifications")}>
              Notifications
            </button>

            <button className="navBtn" onClick={() => go("/settings/privacy")}>
              Privacy
            </button>

            <button className="navBtn" onClick={() => go("/settings/help")}>
              Help
            </button>

            <button className="navBtn" onClick={() => go("/settings/accountcenter")}>
              Account Center
            </button>

            <button className="navBtn" onClick={() => go("/feedback")}>
              Feedback
            </button>

            <button className="navBtn" onClick={() => go("/about")}>
              About This App
            </button>

          </nav>
        </div>

        {/* right content */}
        <div className="flex-1 relative p-12 text-black">

          <button
            className="absolute top-6 right-6 text-red-500 hover:text-red-400 transition"
            onClick={() => setUsersSettings(false)}
          >
            <GiCrossedBones className="text-3xl" onClick={() => navigate("/dashboard")} />
          </button>

          <h1 className="text-4xl font-bold mb-4">
            Settings Dashboard
          </h1>

          <p className="text-neutral-900 text-lg">
            Manage your account preferences, notifications,
            privacy settings and application behaviour.
          </p>

        </div>
      </div>
    </div>
  );
}

export default UsersSettings;