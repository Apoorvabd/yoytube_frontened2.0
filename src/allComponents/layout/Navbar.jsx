import { useMemo, useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredUser } from "@/lib/api";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const storedUser = useMemo(() => getStoredUser(), []);
  const avatar = storedUser?.user?.avatar;

  const submitSearch = (event) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#181818]/80 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-left transition hover:opacity-90"
        >
          <p className="text-xl font-extrabold tracking-tight text-white md:text-2xl">NAVYA</p>
          <p className="-mt-1 text-[10px] uppercase tracking-[0.35em] text-[#b3b3b3] md:text-xs">EAKSHAN</p>
        </button>

        <form onSubmit={submitSearch} className="hidden flex-1 justify-center md:flex">
          <div className="group flex w-full max-w-xl items-center gap-2 rounded-full border border-white/10 bg-[#202020]/80 px-4 py-2.5 transition duration-300 focus-within:border-[#E50914]/80 focus-within:shadow-[0_0_0_4px_rgba(229,9,20,0.14)]">
            <Search className="h-4 w-4 text-[#b3b3b3]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search videos, channels, creators"
              className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#8f8f8f]"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            className="hidden rounded-full border border-white/10 bg-[#202020]/75 p-2 text-[#b3b3b3] transition hover:text-white md:inline-flex"
          >
            <Bell className="h-4 w-4" />
          </button>

          {storedUser?.user ? (
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-[#202020]/80 px-2 py-1.5 transition hover:border-white/20"
            >
              <img
                src={avatar || "/hero.jfif"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-xs font-semibold uppercase tracking-wide text-white md:inline">
                {storedUser.user.username || "Profile"}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-[#b3b3b3] md:inline" />
            </button>
          ) : (
            <button type="button" onClick={() => navigate("/login")} className="accent-btn text-sm">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;