//function to logout the user by clearing the local storage and redirecting to the login page
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
    const storedUser = JSON.parse(localStorage.getItem("user")) ;
    console.log(storedUser);
    
  const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            const response = await axios.post("http://localhost:8000/api/v1/users/logout",{},
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.accessToken}`
                    }
                }
            );
             localStorage.clear();
             navigate("/login");
            console.log("Logout response:", response.data);
        }
        catch(error){
            console.error("Logout error:", error);}
        }


return (
    <div className="fixed justify-center items-center h-screen ">
        <div className="w-[400px] h-[200px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-bold">
                Are you sure you want to logout?
            </h2>
            <div className="flex gap-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => handleLogout()}>
                    Logout  
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => navigate("/settings/accountcenter")}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);
}

export default Logout;
