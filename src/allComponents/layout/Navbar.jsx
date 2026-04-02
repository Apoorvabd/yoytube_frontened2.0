import { useMemo, useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api, { getStoredUser } from "@/lib/api";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);
  const storedUser = useMemo(() => getStoredUser(), []);
  const avatar = storedUser?.user?.avatar;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch?.(query.trim());
    try {
      const response = await api.get("/videos/search", {
        params: { q: query.trim() },
      });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-[100] w-full px-4 transition-all duration-500 border-b ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-border py-3 shadow-sm" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1700px] items-center justify-between gap-6 md:px-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-foreground/70 hover:text-foreground">
            <Menu size={24} />
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 transition-transform active:scale-95"
          >
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <span className="text-xl font-black">N</span>
            </div>
            <div className="flex flex-col items-start leading-none pt-0.5">
              <span className="text-xl font-[1000] tracking-tighter text-foreground">
                NAVYA<span className="text-primary">.</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                EAKSHAN
              </span>
            </div>
          </button>
        </div>

        {/* Search Bar Container */}
        <form
          ref={searchRef}
          onSubmit={submitSearch}
          className="relative flex-1 max-w-xl hidden md:block"
        >
          <div className="group relative flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-3 transition-all duration-300 focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5">
            <Search className="h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search creators, videos, topics..."
              className="w-full bg-transparent text-sm font-bold text-foreground outline-none placeholder:text-muted-foreground/50"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 max-h-[480px] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="overflow-y-auto p-3">
                {searchResults.map((video) => (
                  <div
                    key={video._id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                    onClick={() => {
                      setSearchResults([]);
                      navigate(`/video/${video._id}`);
                    }}
                  >
                    <div className="h-10 w-16 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-xs font-bold text-foreground">
                        {video.title}
                      </span>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {video.owner?.fullName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden h-10 w-10 items-center justify-center rounded-xl bg-muted/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex">
            <Bell size={18} />
          </button>
          
          {storedUser ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 rounded-2xl bg-muted/40 p-1.5 transition-all hover:bg-muted md:px-3"
            >
              <div className="h-7 w-7 overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <ChevronDown size={14} className="hidden text-muted-foreground sm:block" />
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="premium-btn-primary px-5 py-2.5 text-xs font-bold"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
