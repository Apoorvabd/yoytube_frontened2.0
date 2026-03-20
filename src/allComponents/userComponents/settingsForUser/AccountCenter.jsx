import React from "react";
import { useNavigate } from "react-router-dom";
import { GiCrossedBones } from "react-icons/gi";
import { DataContext } from "@/Context/UserContext";
import { useContext } from "react";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";

function AccountCenter() {
  const navigate = useNavigate();
  const {logout,setLogout,changePassword,setChangePassword}=useContext(DataContext)

  return (
    <div className="flex justify-center items-center h-[100%] mt-12 mb-12">

      {/* main container */}
      <div className="w-[85%] h-[95%] bg-neutral-200 rounded-2xl shadow-2xl flex p-4 animate-fade-up">

        {/* left navigation */}
        <div className="w-80 bg-neutral-150 flex flex-col items-center pt-12 border-r border-neutral-800">

          <h2 className="text-3xl font-bold text-black mb-10 tracking-wide">
            Account Center
          </h2>

          <nav className="flex flex-col text-black gap-4 w-full px-8">

            <button className="navBtn" onClick={() => navigate("/settings/accountcenter/updateprofile")}>
              Edit Profile
            </button>

            <button className="navBtn" onClick={()=>setChangePassword(true)}>
              Change Password
            </button>

            <button className="navBtn">
              Privacy Settings
            </button>

            <button className="navBtn">
              Security
            </button>

            <button className="navBtn" onClick={()=>setLogout(true)}>
              Log Out
            </button>

            <button className="navBtn">
              Delete Account
            </button>

          </nav>
        </div>

        {/* right content */}
        <div className="flex-1 relative p-12 text-black">

          <button
            className="absolute top-6 right-6 text-red-500 hover:text-red-400 transition"
            onClick={() => navigate("/settings")}
          >
            <GiCrossedBones className="text-3xl" />
          </button>

          <h1 className="text-4xl font-bold mb-4">
            Account Center
          </h1>

          <p className="text-neutral-900 text-lg">
            Manage your profile, password, privacy preferences,
            and account security all in one place.
          </p>
          {logout && <Logout/>}
          {changePassword && <ChangePassword/>}
          

        </div>
      </div>
    </div>
  );
}

export default AccountCenter;