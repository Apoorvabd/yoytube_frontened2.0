import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
function Logout() {

        const storedUser = JSON.parse(localStorage.getItem("user")) ;
    console.log(storedUser);
    
  const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            const response = await api.post("/users/logout",{},
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
    <div
      className="min-h-[60vh] flex items-center justify-center px-4 py-10 z-10"
      style={{ background: "#f6f8fc" }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
          borderColor: "#dbe7ff",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.18)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "linear-gradient(90deg, #e11d48 0%, #f97316 50%, #f59e0b 100%)" }}
        />

        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ring-1"
          style={{
            background: "rgba(225, 29, 72, 0.10)",
            color: "#e11d48",
            borderColor: "rgba(225, 29, 72, 0.18)",
            boxShadow: "inset 0 0 0 1px rgba(225, 29, 72, 0.18)",
          }}
        >
          ⎋
        </div>

        <h2 className="text-2xl font-semibold" style={{ color: "#0f172a" }}>
          Logout from your account?
        </h2>
        <p className="mt-3 text-sm leading-6" style={{ color: "#334155" }}>
          You will be signed out of this session and taken back to the login screen.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => navigate("/settings/accountcenter")}
            className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #dbe7ff",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            Cancel
          </button>
          <button onClick={() => handleLogout()}
            className="inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #e11d48 0%, #fb7185 100%)",
              color: "#ffffff",
              border: "1px solid #e11d48",
              boxShadow: "0 12px 28px rgba(225, 29, 72, 0.28)",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default Logout;