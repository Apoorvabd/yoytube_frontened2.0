import Card_for_vd0 from "./Card_for_vd0";
import api from "../../lib/api";
import { useEffect, useState, useContext, useRef } from "react";
import { VideoContext } from "../../contexts/VideoContext";
import { ChevronDown, SlidersHorizontal, Flame, Calendar, Clock, ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { id: "views", label: "Trending Now", icon: Flame, desc: "Most viewed videos first" },
  { id: "createdAt", label: "Recently Added", icon: Calendar, desc: "Newest uploads first" },
  { id: "duration", label: "Long Duration", icon: Clock, desc: "Longer format videos" },
  { id: "title", label: "Alphabetical", icon: ArrowUpDown, desc: "Videos sorted A-Z" },
];

function AllVdo() {
  const ctx = useContext(VideoContext);
  if (!ctx) return null;

  const { videos, setVideos } = ctx;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("views"); // default sort is views / trending
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Auth headers are optional — guests can still browse videos
        const authHeaders = storedUser?.accessToken
          ? { headers: { Authorization: `Bearer ${storedUser.accessToken}` } }
          : {};

        // Fetching more videos to populate a complete grid (e.g. limit=40)
        const res = await api.get(`/videos?sortBy=${sortBy}&sortType=desc&limit=40`, authHeaders);
        setVideos(res.data?.data?.videos || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Network error: Try refreshing the page");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [sortBy, setVideos]);

  const activeOption = SORT_OPTIONS.find(opt => opt.id === sortBy) || SORT_OPTIONS[0];
  const ActiveIcon = activeOption.icon;

  return (
    <section className="space-y-8 pb-20 bg-background text-foreground transition-colors duration-300">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm transition-all hover:shadow-md">
          <p className="text-sm font-bold text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 text-xs font-black uppercase tracking-widest text-red-700 hover:text-red-900 underline underline-offset-4"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Control Bar & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6 px-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            Explore Content
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </h3>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Displaying {videos.length} videos sorted by {activeOption.label.toLowerCase()}
          </p>
        </div>

        {/* Dropdown Select Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex w-full sm:w-auto items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80 active:scale-98"
          >
            <span className="flex items-center gap-2">
              <ActiveIcon size={16} className="text-primary animate-pulse" />
              <span>Sort: {activeOption.label}</span>
            </span>
            <ChevronDown 
              size={16} 
              className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-primary" : ""}`} 
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 dark:border-slate-800 dark:bg-slate-950/95 z-50">
              <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-900 mb-1">
                Choose View Options
              </div>
              {SORT_OPTIONS.map((option) => {
                const OptionIcon = option.icon;
                const isSelected = option.id === sortBy;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-slate-100 text-primary dark:bg-slate-900 dark:text-white"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/50 dark:hover:text-white"
                    }`}
                  >
                    <OptionIcon size={16} className={`mt-0.5 shrink-0 ${isSelected ? "text-primary" : "text-slate-400"}`} />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-none">{option.label}</span>
                      <span className="text-[10px] text-slate-500 mt-1">{option.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      {!loading && videos && videos.length > 0 ? (
        <div className="px-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {videos.map((video) => (
              <Card_for_vd0 key={video._id} video={video} />
            ))}
          </div>
        </div>
      ) : !loading && (
        <div className="mx-4 rounded-[2rem] border-2 border-dashed border-border bg-muted/20 p-16 text-center">
          <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">No videos found</p>
        </div>
      )}

      {/* Skeleton Loading State */}
      {loading && (
        <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="space-y-4">
              <div className="aspect-video w-full animate-pulse rounded-[1.5rem] bg-slate-200/80 dark:bg-slate-800/80" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-800/80" />
                <div className="h-3 w-1/2 animate-pulse rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AllVdo;

