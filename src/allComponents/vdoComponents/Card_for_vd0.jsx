import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { Play } from "lucide-react";


function Card_for_vd0({ video, compact = false }) {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const [more, setMore] = useState(false);

  const isOwner =
    Boolean(storedUser?.user?._id && video?.owner?._id) &&
    storedUser.user._id === video.owner._id;

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${video.owner._id}`);
  };

  const onShare = async (e) => {
    e.stopPropagation();
    const videoUrl = `${window.location.origin}/videos/${video._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: videoUrl,
        });
      } else {
        await navigator.clipboard.writeText(videoUrl);
        alert("Video link copied!");
      }
    } catch {
      await navigator.clipboard.writeText(videoUrl);
      alert("Video link copied!");
    }
    setMore(false);
  };

  const onSave = (e) => {
    e.stopPropagation();
    const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");
    const alreadySaved = savedVideos.some((saved) => saved._id === video._id);

    if (!alreadySaved) {
      savedVideos.push({
        _id: video._id,
        title: video.title,
        thumbnail: video.thumbnail,
      });
      localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
      alert("Video saved!");
    } else {
      alert("Video already saved.");
    }

    setMore(false);
  };

  const onEdit = (e) => {
    e.stopPropagation();
    setMore(false);
    alert("Edit action yahan connect kar sakte ho.");
  };

  const onDelete = (e) => {
    e.stopPropagation();
    setMore(false);
    navigate(`/deletevideo/${video._id}`);
  };


  if (!video) {
    return <div className="text-sm text-[#b3b3b3]">No video data</div>;
  }

  const createdLabel = video.createdAt ? new Date(video.createdAt).toDateString() : "Recently";

  return (
    <article
      className={`group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_35px_-20px_rgba(229,9,20,0.5)] ${
        compact ? "" : "hover:border-white/20"
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-[#111]" onClick={() => navigate(`/videos/${video._id}`)}>
        <img
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          src={video.thumbnail}
          alt="Video Thumbnail"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E50914]/90 text-white shadow-glow">
            <Play size={20} fill="currentColor" />
          </span>
        </div>
      </div>

      <div className={`space-y-3 ${compact ? "p-3" : "p-4"}`}>
        <div className="relative flex justify-between gap-2">
          <h3 className={`line-clamp-2 leading-5 text-white ${compact ? "text-sm" : "text-base font-semibold"}`}>{video.title}</h3>
        <button
          type="button"
          className="rounded p-1 text-[#b3b3b3] transition hover:bg-white/10 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            setMore((prev) => !prev);
          }}
        >
          <IoMdMore />
        </button>

        {more && (
          <div
            className="absolute right-0 top-7 z-10 min-w-[160px] rounded-xl border border-white/10 bg-[#202020] p-1.5 shadow-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onShare}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-[#d7d7d7] transition hover:bg-white/10"
            >
              Share
            </button>
            <button
              type="button"
              onClick={onSave}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-[#d7d7d7] transition hover:bg-white/10"
            >
              Save
            </button>

            {isOwner && (
              <>
                <button
                  type="button"
                  onClick={onEdit}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-[#d7d7d7] transition hover:bg-white/10"
                >
                  Edit Video
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-[#ff7b82] transition hover:bg-[#E50914]/15"
                >
                  Delete Video
                </button>
              </>
            )}
          </div>
        )}
       </div>

        {!compact && <p className="line-clamp-2 text-sm leading-5 text-[#b3b3b3]">{video.description}</p>}

        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs text-[#9f9f9f]">
          <span className="rounded-full bg-white/10 px-2.5 py-1 font-medium text-[#d8d8d8]">{video.views || 0} views</span>
          <span>{createdLabel}</span>
        </div>
        <div className="inset-x-0 bottom-0 mt-1 flex items-center gap-2" onClick={(e) => handleProfileClick(e)}>
          <img
            src={video.owner?.avatar || "/hero.jfif"}
            alt="Author Avatar"
            className="h-8 w-8 rounded-full object-cover"
          />

          <p className="line-clamp-1 text-xs font-semibold uppercase tracking-wide text-white/95">
            {video.owner?.username || "Unknown"}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card_for_vd0;
