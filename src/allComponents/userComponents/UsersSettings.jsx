import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../../contexts/UIContext";
import AppShell from "../layout/AppShell";
import { X, ChevronRight } from "lucide-react";

const menuItems = [
  { label: "Account Center", path: "/settings/accountcenter", desc: "Profile, password & credentials", emoji: "👤" },
  { label: "Privacy", path: "/settings/privacy", desc: "Data, visibility & permissions", emoji: "🔒" },
  { label: "Notifications", path: "/notifications", desc: "Alerts, updates & reminders", emoji: "🔔" },
  { label: "Switch Account", path: "/login", desc: "Log in as a different user", emoji: "🔄" },
  { label: "Help & Support", path: "/settings/help", desc: "FAQs & contact our team", emoji: "💬" },
  { label: "Feedback", path: "/feedback", desc: "Share your thoughts with us", emoji: "✍️" },
  { label: "About This App", path: "/about", desc: "Version & attributions", emoji: "ℹ️" },
];

function UsersSettings() {
  const { setUsersSettings } = useContext(UIContext);
  const navigate = useNavigate();

  const go = (path) => {
    setUsersSettings(false);
    navigate(path);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/10 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">Preference Center</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Settings</h1>
            </div>
            <button
              onClick={() => { setUsersSettings(false); navigate("/dashboard"); }}
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition-all duration-200 active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => go(item.path)}
                style={{ animationDelay: `${index * 40}ms` }}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20 hover:-translate-y-0.5 transition-all duration-250 text-left active:scale-[0.98] animate-in fade-in slide-in-from-bottom-2"
              >
                <span className="text-2xl w-9 text-center leading-none select-none">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-200" />
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-dashed border-slate-200 dark:border-slate-800" />

          {/* Logout */}
          <button
            onClick={() => go("/logout")}
            className="group w-full flex items-center justify-center gap-2 py-4 px-5 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/60 dark:bg-red-950/10 text-red-500 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-950/30 hover:border-red-200 transition-all duration-200 active:scale-[0.98]"
          >
            <span className="text-lg">🚪</span>
            Sign out of account
          </button>

        </div>
      </div>
    </AppShell>
  );
}

export default UsersSettings;