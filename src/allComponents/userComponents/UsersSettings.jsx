
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/UserContext";
import { GiCrossedBones } from "react-icons/gi";
import AppShell from "../layout/AppShell";
import { Settings, User, Bell, Shield, HelpCircle, UserRound, MessageSquare, Info, LogOut } from "lucide-react";

function UsersSettings() {
  const { setUsersSettings } = useContext(DataContext);
  const navigate = useNavigate();

  const go = (path) => {
    setUsersSettings(false);
    navigate(path);
  };

  const menuItems = [
    { label: "General", icon: <Settings size={18} />, path: "/General" },
    { label: "Switch Account", icon: <User size={18} />, path: "/login" },
    { label: "Notifications", icon: <Bell size={18} />, path: "/notifications" },
    { label: "Privacy", icon: <Shield size={18} />, path: "/settings/privacy" },
    { label: "Help", icon: <HelpCircle size={18} />, path: "/settings/help" },
    { label: "Account Center", icon: <UserRound size={18} />, path: "/settings/accountcenter" },
    { label: "Feedback", icon: <MessageSquare size={18} />, path: "/feedback" },
    { label: "About This App", icon: <Info size={18} />, path: "/about" },
  ];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* main container */}
        <div 
          className="surface-card overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-border animate-in fade-in zoom-in duration-500"
        >
          {/* left navigation */}
          <div className="md:w-80 bg-muted/20 border-r border-border p-8 flex flex-col">
            <h2 className="text-3xl font-black text-foreground mb-8 tracking-tighter">
              Settings
            </h2>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => go(item.path)}
                  className="flex items-center gap-4 px-4 py-3.2 rounded-xl font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-sm group"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <button 
                onClick={() => go("/logout")}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-destructive hover:bg-destructive/10 transition-all text-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* right content */}
          <div className="flex-1 p-10 md:p-16 relative">
            <button
              className="absolute top-8 right-8 h-10 w-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
              onClick={() => {
                setUsersSettings(false);
                navigate("/dashboard");
              }}
            >
              <GiCrossedBones />
            </button>

            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-primary mb-4 block">Preference Center</span>
              <h1 className="text-5xl font-black text-foreground mb-6 tracking-tighter">
                Control your experience
              </h1>

              <p className="text-muted-foreground text-xl font-medium leading-relaxed mb-12">
                Manage your account preferences, security options, 
                and privacy settings all in one place.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-muted/30 border border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Shield size={24} />
                  </div>
                  <h3 className="font-black text-foreground mb-2">Security Audit</h3>
                  <p className="text-sm text-muted-foreground font-medium">Check your password health and active sessions.</p>
                </div>
                <div className="p-6 rounded-3xl bg-muted/30 border border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <UserRound size={24} />
                  </div>
                  <h3 className="font-black text-foreground mb-2">Profile Sync</h3>
                  <p className="text-sm text-muted-foreground font-medium">Update your public appearance and bio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default UsersSettings;