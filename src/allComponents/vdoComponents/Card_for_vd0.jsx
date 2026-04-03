import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import { Play, Share2, Bookmark, Trash2, Clock, User } from "lucide-react";

/**
 * MenuButton sub-component for the video card options
 */
const MenuButton = ({ icon, label, onClick, destructive = false }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      destructive
        ? "text-red-500 hover:bg-red-50/80 dark:hover:bg-red-950/30"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
    }`}
  >
    <span className={destructive ? "text-red-500" : "text-slate-400 group-hover:text-primary"}>
      {icon}
    </span>
    <span>{label}</span>
  </button>
);

const Card_for_vd0 = ({ video, compact = false }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  
  // Safely get user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  if (!video) return null;

  const isOwner =
    Boolean(storedUser?.user?._id && video?.owner?._id) &&
    storedUser.user._id === video.owner?._id;

  const handleCardClick = () => {
    navigate(`/video/${video._id}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (video.owner?._id) {
      navigate(`/channel/${video.owner._id}`);
    }
  };

  const onShare = async (e) => {
    const videoUrl = `${window.location.origin}/video/${video._id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, url: videoUrl });
      } else {
        await navigator.clipboard.writeText(videoUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
    setShowMenu(false);
  };

  const onSave = (e) => {
    // Implement save logic here
    setShowMenu(false);
  };

  const onDelete = (e) => {
    setShowMenu(false);
    navigate(`/deletevideo/${video._id}`);
  };

  const formattedDate = video.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(video.createdAt))
    : "Recently";

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 dark:border-slate-800 dark:bg-slate-900 ${
        compact ? "max-w-md" : "w-full"
      } cursor-pointer surface-card`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden p-2 md:p-3">
        <div className="relative h-full w-full overflow-hidden rounded-[1rem] md:rounded-[1.5rem] bg-slate-100 dark:bg-slate-800">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-white/90 text-primary shadow-xl transition-transform duration-300 group-hover:scale-110 active:scale-95">
              <Play size={20} fill="currentColor" className="ml-0.5 md:ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex items-center gap-1.5 rounded-lg md:rounded-xl border border-white/20 bg-black/60 px-2 md:px-3 py-1 md:py-1.5 text-[9px] md:text-[11px] font-bold text-white backdrop-blur-md">
            <Clock size={10} className="md:w-3 md:h-3" />
            <span>{video.duration || "00:00"}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col px-4 pb-4 md:px-6 md:pb-6 pt-1 md:pt-2">
        <div className="flex items-start justify-between gap-3 md:gap-4">
          <div className="flex-1 space-y-2 md:space-y-3">
            <h3 className="line-clamp-2 text-sm md:text-lg font-bold leading-tight md:leading-snug tracking-tight text-slate-800 transition-colors hover:text-primary dark:text-slate-100">
              {video.title}
            </h3>

            {/* Owner Info */}
            <div className="flex items-center gap-2 md:gap-3 group/owner" onClick={handleProfileClick}>
              <div className="relative h-8 w-8 md:h-10 md:w-10 shrink-0 overflow-hidden rounded-lg md:rounded-2xl border-2 border-slate-100 bg-slate-200 shadow-sm transition-transform group-hover/owner:scale-105 dark:border-slate-700 dark:bg-slate-800">
                {video.owner?.avatar ? (
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    <User size={16} className="md:w-5 md:h-5" />
                  </div>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs md:text-sm font-semibold text-slate-700 hover:text-primary dark:text-slate-300">
                  {video.owner?.fullName || "Anonymous Creator"}
                </span>
                <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  <span>{video.views?.toLocaleString() || 0} Views</span>
                  <span className="h-0.5 w-0.5 md:h-1 md:w-1 rounded-full bg-slate-400"></span>
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200 ${
                showMenu 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              <IoMdMore size={24} />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                  }}
                />
                <div className="absolute right-0 top-12 z-20 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 dark:border-slate-700 dark:bg-slate-900/95">
                  <MenuButton 
                    icon={<Share2 size={18} />} 
                    label="Share Video" 
                    onClick={onShare} 
                  />
                  <MenuButton 
                    icon={<Bookmark size={18} />} 
                    label="Save to Playlist" 
                    onClick={onSave} 
                  />
                  {isOwner && (
                    <>
                      <div className="my-2 h-px bg-slate-100 dark:bg-slate-800" />
                      <MenuButton 
                        icon={<Trash2 size={18} />} 
                        label="Delete Video" 
                        onClick={onDelete} 
                        destructive 
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card_for_vd0;