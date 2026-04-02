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
  { label: "Explore", to: "/explore", icon: Compass },
  { label: "Subscriptions", to: "/subscriptions", icon: Play },
  { label: "Upload", to: "/upload", icon: PlusCircle },
  { label: "Liked", to: "/liked-videos", icon: Heart },
  { label: "History", to: "/history", icon: History },
  { label: "Settings", to: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out px-4 py-6 rounded-r-[2rem] shadow-sm ${
        isCollapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-primary hover:bg-muted transition-colors shadow-sm z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation List */}
      <nav className="flex flex-col gap-2 mt-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <link.icon
              size={22}
              className={`shrink-0 transition-colors ${
                isCollapsed ? "mx-auto" : ""
              }`}
            />
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding */}
      <div className="mt-auto">
        {!isCollapsed && (
          <div className="px-4 py-4 text-[10px] text-muted-foreground/60 font-medium tracking-wider uppercase">
            &copy; 2024 VDO Platform
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;