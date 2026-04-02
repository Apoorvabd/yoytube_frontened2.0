import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import api, { getAuthHeaders, getStoredUser } from "@/lib/api";
import EditComments from "./comments_on_cdo/EditComments";


const VdoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newcomment, setNewComment] = useState("");
  const [liked, setLiked] = useState([]);
  const [moreMenuId, setMoreMenuId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const storedUser = getStoredUser();
  const currentUserId = storedUser?.user?._id;

  const addcomment = async () => {
    if (!newcomment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await api.post(
        `/comments/${videoId}`,
        { content: newcomment.trim() },
        {
          headers: getAuthHeaders(),
        }
      );

      toast.success("Comment added successfully");
      setComments((prev) => [...prev, response.data.data]);
      setNewComment("");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };
  const handleLike = async (commentId) => {
    try {
      await api.post(
        `/likes/toggle/c/${commentId}`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );
      setLiked(prev => prev.includes(commentId) ? prev.filter(id => id !== commentId) : [...prev, commentId]);
      console.log("Toggled like for comment:", commentId);
      toast.success(liked.includes(commentId) ? "Comment unliked" : "Comment liked");
    } catch (err) {
      toast.error("Failed to like comment");
    }
  };

  const toggleMoreMenu = (commentId) => {
    setMoreMenuId((prev) => (prev === commentId ? null : commentId));
  };

  const handleShareComment = async (comment) => {
    const shareText = `${comment.commenter?.fullName || "User"}: ${comment.content}`;

    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Comment copied to clipboard");
    } catch {
      toast.error("Failed to copy comment");
    }

    setMoreMenuId(null);
  };

  const handleEditComment = () => {
    const comment = comments.find((item) => item._id === moreMenuId);
    if (!comment) {
      setMoreMenuId(null);
      return;
    }

    setEditingCommentId(comment._id);
    setEditingText(comment.content || "");
    setMoreMenuId(null);
  };

  const handleDeleteComment = async () => {
    if (!moreMenuId) return;

    try {
      await api.delete(`/comments/c/${moreMenuId}`, {
        headers: getAuthHeaders(),
      });

      setComments((prev) => prev.filter((comment) => comment._id !== moreMenuId));
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete comment");
    }

    setMoreMenuId(null);
  };

  const saveEditedComment = async (overrideText) => {
    const contentToSave = (overrideText ?? editingText).trim();

    if (!editingCommentId || !contentToSave) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setSavingEdit(true);
      const response = await api.patch(
        `/comments/c/${editingCommentId}`,
        { content: contentToSave },
        {
          headers: getAuthHeaders(),
        }
      );

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === editingCommentId
            ? { ...comment, content: response?.data?.data?.content || contentToSave }
            : comment
        )
      );

      toast.success("Comment updated");
      setEditingCommentId(null);
      setEditingText("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update comment");
    } finally {
      setSavingEdit(false);
    }
  };
  

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/${videoId}`, {
          headers: getAuthHeaders(),
        });

        setComments(response.data.data || []);
      } catch (err) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  if (error) {
    return (
      <p className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </p>
    );
  }

  return (
    <section className="surface-card p-5 md:p-6">
      <Toaster position="top-right" />

      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Discussion</p>
          <h2 className="mt-1 text-2xl font-black text-foreground">Comments</h2>
        </div>
        <span className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-semibold text-muted-foreground">
          {comments.length} total
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-muted/10 p-3 md:p-4">
        <textarea
          value={newcomment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment"
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
        />
        <div className="mt-3 flex justify-end">
          <button
            className="accent-btn text-sm disabled:cursor-not-allowed disabled:opacity-60"
            onClick={addcomment}
            disabled={!newcomment.trim()}
          >
            Post Comment
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {loading ? (
          <div className="space-y-2">
            <div className="h-20 rounded-xl shimmer" />
            <div className="h-20 rounded-xl shimmer" />
          </div>
        ) : comments.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-muted/10 p-4 text-sm text-muted-foreground text-center">
            No comments yet. Start the conversation.
          </p>
        ) : (
          comments.map((comment) => (
            <article key={comment._id} className="relative rounded-2xl border border-border bg-card p-4 transition hover:border-primary/20">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">{(comment.commenter?.fullName || "U")[0]}</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{comment.commenter?.fullName || "Unknown"}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">comment</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="w-full">
                  {editingCommentId === comment._id ? (
                    <EditComments
                      initialValue={editingText}
                      loading={savingEdit}
                      onSave={(content) => {
                        saveEditedComment(content);
                      }}
                      onCancel={() => {
                        setEditingCommentId(null);
                        setEditingText("");
                      }}
                    />
                  ) : (
                    <p className="text-sm leading-6 text-foreground/80">{comment.content}</p>
                  )}
                </div>
                <div className="relative flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLike(comment._id)}
                    className="flex items-center gap-1 text-sm font-semibold transition hover:scale-110 active:scale-90"
                  >
                    <CiHeart className={`text-2xl ${liked.includes(comment._id) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleMoreMenu(comment._id)}
                    className="p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <IoMdMore className="text-xl text-muted-foreground" />
                  </button>

                  {moreMenuId === comment._id && (
                    <div className="absolute right-0 top-12 z-20 min-w-[180px] overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        type="button"
                        onClick={() => {
                          handleShareComment(comment);
                          setMoreMenuId(null);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition-all hover:bg-muted hover:text-foreground"
                      >
                        Share Comment
                      </button>

                      {currentUserId === comment.commenter?._id && (
                        <>
                          <div className="my-1 h-px bg-border/50" />
                          <button
                            type="button"
                            onClick={() => {
                              handleEditComment();
                              setMoreMenuId(null);
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition-all hover:bg-muted hover:text-foreground"
                          >
                            Edit Comment
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteComment();
                              setMoreMenuId(null);
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
                          >
                            Delete Comment
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default VdoComments;
