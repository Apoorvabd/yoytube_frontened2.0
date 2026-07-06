import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../lib/api";
import AppShell from "../../layout/AppShell";
import { useContext, useState } from "react";
import { UIContext } from "@/contexts/UIContext";
import Create_playlist from "./Create_playlist";
import { Plus, ListVideo, ChevronRight, Play } from "lucide-react";

const PLACEHOLDER = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=640&q=80";

function PlaylistSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse">
          <div className="aspect-video bg-slate-200 dark:bg-slate-800" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Playlist() {
  const { setNewPlalistS, newPlaylistS } = useContext(UIContext);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const { data: playlists = [], isLoading, isError } = useQuery({
    queryKey: ["playlists", storedUser?.user?._id],
    queryFn: async () => {
      if (!storedUser?.user?._id) return [];
      const res = await api.get(`/playlist/user/${storedUser.user._id}`, {
        headers: { Authorization: `Bearer ${storedUser.accessToken}` },
      });
      return res.data.data || [];
    },
    enabled: !!storedUser?.user?._id,
  });

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-violet-500 mb-1">Your Library</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <ListVideo size={28} className="text-violet-500" />
                Playlists
              </h1>
              {!isLoading && (
                <p className="text-sm text-slate-400 font-medium mt-1">
                  {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"} saved
                </p>
              )}
            </div>
            <button
              onClick={() => setNewPlalistS(true)}
              className="premium-btn-primary gap-2"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Playlist</span>
            </button>
          </div>

          {/* Create Playlist Modal */}
          {newPlaylistS && <Create_playlist />}

          {/* Loading */}
          {isLoading && <PlaylistSkeleton />}

          {/* Error */}
          {isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 p-8 text-center">
              <p className="text-sm font-bold text-red-500">Failed to load playlists. Please try again.</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && playlists.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2">No playlists yet</h2>
              <p className="text-sm text-slate-400 font-medium mb-6">Create your first playlist to organize your favorite videos.</p>
              <button onClick={() => setNewPlalistS(true)} className="premium-btn-primary">
                <Plus size={16} /> Create Playlist
              </button>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && playlists.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {playlists.map((playlist, index) => {
                const thumb = playlist.videos?.[0]?.thumbnail || PLACEHOLDER;
                return (
                  <div
                    key={playlist._id}
                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={thumb}
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = PLACEHOLDER; }}
                      />
                      {/* Video count badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/10">
                        <Play size={11} className="text-white fill-white" />
                        <span className="text-white text-xs font-bold">{playlist.videos?.length || 0} videos</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 truncate transition-colors">
                          {playlist.name}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {playlist.description || "No description"}
                        </p>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-slate-300 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </AppShell>
  );
}

export default Playlist;