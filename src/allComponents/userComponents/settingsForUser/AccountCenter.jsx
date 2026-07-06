import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import AppShell from "../../layout/AppShell";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";
import { ChevronRight, ArrowLeft } from "lucide-react";

const accountItems = [
  { label: "Edit Profile", desc: "Change your name, bio & email", emoji: "✏️", action: "updateprofile" },
  { label: "Change Password", desc: "Update your security credentials", emoji: "🔑", action: "changepassword" },
  { label: "Privacy Settings", desc: "Control what others see", emoji: "🔒", action: "privacy" },
  { label: "Security", desc: "Active sessions & login activity", emoji: "🛡️", action: "security" },
  { label: "Sign Out", desc: "Log out from this account", emoji: "🚪", action: "logout" },
  { label: "Delete Account", desc: "Permanently remove your account", emoji: "🗑️", action: "delete", danger: true },
];

function AccountCenter() {
  const navigate = useNavigate();
  const { logout, setLogout, changePassword, setChangePassword } = useContext(AuthContext);

  const handleAction = (action) => {
    if (action === "updateprofile") navigate("/settings/accountcenter/updateprofile");
    else if (action === "changepassword") setChangePassword(true);
    else if (action === "logout") setLogout(true);
    else if (action === "privacy") navigate("/settings/privacy");
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/10 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Back + Header */}
          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={() => navigate("/settings")}
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-violet-500 mb-0.5">Settings</p>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Account Center</h1>
            </div>
          </div>

          {/* Description Card */}
          <div className="rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/20 border border-violet-100 dark:border-violet-900/30 p-5 mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Manage your profile, password, privacy preferences, and account security all in one place.
            </p>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            {accountItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleAction(item.action)}
                style={{ animationDelay: `${index * 40}ms` }}
                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl border bg-white dark:bg-slate-900 transition-all duration-200 text-left active:scale-[0.98] animate-in fade-in slide-in-from-bottom-2 ${
                  item.danger
                    ? "border-red-100 dark:border-red-900/30 hover:border-red-200 hover:bg-red-50/50 dark:hover:bg-red-950/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-0.5"
                }`}
              >
                <span className="text-2xl w-9 text-center leading-none select-none">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold transition-colors ${item.danger ? "text-red-500" : "text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400"}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{item.desc}</p>
                </div>
                <ChevronRight size={16} className={`shrink-0 group-hover:translate-x-0.5 transition-all duration-200 ${item.danger ? "text-red-300" : "text-slate-300 group-hover:text-violet-400"}`} />
              </button>
            ))}
          </div>

        </div>
      </div>

      {logout && <Logout />}
      {changePassword && <ChangePassword />}
    </AppShell>
  );
}

export default AccountCenter;