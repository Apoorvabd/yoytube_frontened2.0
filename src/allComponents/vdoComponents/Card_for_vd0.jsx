import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../Context/UserContext";

function Card_for_vd0({ video }) {
  const navigate = useNavigate();
  const handleProfileClick = (e) => {
    navigate(`/channel/${video.owner._id}`);
  };

  if (!video) {
    return <div className="text-sm text-slate-500">No video data</div>;
  }

  return (
    <article
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
     
    >
      <div className="relative aspect-video overflow-hidden bg-slate-200"
       onClick={() => navigate(`/videos/${video._id}`)}>
        <img
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          src={video.thumbnail}
          alt="Video Thumbnail"
        />
      
      </div>

      <div className="space-y-3 p-3.5">
          
        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">{video.title}</h3>
        <p className="line-clamp-2 text-xs leading-5 text-slate-600">{video.description}</p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium">{video.views || 0} views</span>
          <span>{video.createdAt ? new Date(video.createdAt).toDateString() : ""}</span>
        
           
        </div>
        <div className="inset-x-0 bottom-0 mt-1 flex items-center gap-2" 
        onClick={()=>handleProfileClick()}>
  <img
    src={video.owner?.avatar}
    alt="Author Avatar"
    className="w-8 h-8 rounded-full object-cover"
  />

  <p className="line-clamp-1 text-xs font-semibold uppercase tracking-wide text-black/95">
    {video.owner?.username || "Unknown"}
  </p>
</div>
      </div>
    </article>
  );
}

export default Card_for_vd0;
