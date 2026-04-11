import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  Play,
  PlusCircle,
  History,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Navigation links config
const links = [
  { label: "Home", to: "/", icon: Home },
  { label: "Plalist", to: "/Playlist", icon: Compass },
  { label: "Subscriptions", to: "/subscriptions", icon: Play },
  { label: "Upload", to: "/upload", icon: PlusCircle },
  { label: "Liked", to: "/liked-videos", icon: Heart },
  { label: "History", to: "/history", icon: History },
  { label: "Settings", to: "/settings", icon: Settings },
];

const Sidebar = ({ isMobileNav = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isMobileNav) {
    return (
      <nav className="flex w-full items-center justify-around gap-1">
        {links.slice(0, 5).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <link.icon size={20} className="shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {link.label === "Subscriptions" ? "Subs" : link.label}
            </span>
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <aside
      className={` hidden lg:flex flex-col h-[calc(100vh-120px)] sticky top-24 bg-card border border-red-900 transition-all duration-300 ease-in-out px-4 py-6 rounded-[2rem] shadow-sm ${
        isCollapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-red-100 text-muted-foreground hover:text-primary hover:bg-muted transition-colors shadow-sm z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation List */}
      <nav className="flex flex-col gap-2 mt-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group bg-slate-100 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <link.icon
              size={20}
              className={`shrink-0 transition-colors ${
                isCollapsed ? "mx-auto" : ""
              }`}
            />
            {!isCollapsed && (
              <span className="text-sm font-bold whitespace-nowrap  italic tracking-tight">
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding */}
      {!isCollapsed && (
        <div className="mt-auto px-4 py-4 text-[10px] text-muted-foreground/60 font-black tracking-widest uppercase italic">
          &copy; 2024 VDO Platform
        </div>
      )}
    </aside>
  );
};

export default Sidebar;