import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Save, X, Image as ImageIcon, Loader2 } from "lucide-react";
import api, { getAuthHeaders } from "@/lib/api";
import AppShell from "../../layout/AppShell";

function EditVdo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await api.get(`/videos/${id}`, { headers: getAuthHeaders() });
        const video = response.data.data.video || response.data.data;
        setFormData({
          title: video.title,
          description: video.description,
        });
        setPreview(video.thumbnail);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch video details");
        navigate(-1);
      }
    };
    fetchVideoDetails();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      await api.patch(`/videos/${id}`, data, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Video updated successfully!");
      navigate(`/video/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update video");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-foreground">Edit Video</h1>
            <p className="text-muted-foreground mt-1">Update your video details and thumbnail</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Thumbnail Upload */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <label className="text-sm font-bold block">Thumbnail</label>
              <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-border group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
                    <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                  <span className="text-xs font-bold text-white bg-primary px-4 py-2 rounded-full">Change Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Recommendation: 1280x720 (16:9 aspect ratio)
              </p>
            </div>
          </div>

          {/* Right: Details Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter video title"
                className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Talk about your video..."
                rows={6}
                className="w-full bg-muted/30 border border-border rounded-2xl px-5 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition resize-none"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
              >
                {updating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 bg-muted font-bold rounded-2xl hover:bg-muted/80 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

export default EditVdo;
