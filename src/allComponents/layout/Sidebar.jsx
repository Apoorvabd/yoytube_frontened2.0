import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PanelLeftClose,
  PanelLeftOpen,
  House,
  LayoutDashboard,
  Upload,
  Heart,
  History,
  ListVideo,
  Users,
} from "lucide-react";
import { getStoredUser } from "@/lib/api";

const links = [
  { label: "Home", to: "/", icon: House },
  { label: "Dashboard", to: "/Dashboard", icon: LayoutDashboard },
  { label: "Upload", to: "/Upload", icon: Upload },
  { label: "Liked", to: "/likedvideos", icon: Heart },
  { label: "History", to: "/history", icon: History },
  { label: "Playlist", to: "/Playlist", icon: ListVideo },
  { label: "Channels", to: "/subscribedchannels", icon: Users },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const storedUser = useMemo(() => getStoredUser(), []);

  return (
    <aside
      className={`sticky top-[77px] hidden h-[calc(100vh-94px)] self-start rounded-2xl border border-white/10 bg-[#181818] p-3 shadow-surface transition-all duration-300 lg:block ${
        collapsed ? "w-[88px]" : "w-[250px]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between px-1">
        {!collapsed && <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#777]">Browse</p>}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded-lg border border-white/10 p-1.5 text-[#b3b3b3] transition hover:text-white"
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="space-y-1.5">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[#E50914]/20 text-white shadow-[0_0_22px_rgba(229,9,20,0.28)]"
                  : "text-[#b3b3b3] hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && storedUser?.user && (
        <div className="mt-6 rounded-xl border border-white/10 bg-[#202020]/80 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-[#888]">Signed in as</p>
          <p className="mt-1 line-clamp-1 text-sm font-semibold text-white">{storedUser.user.username}</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;