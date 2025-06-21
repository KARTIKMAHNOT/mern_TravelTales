import React, { useState } from "react";
import { useCommentStore } from "../stores/useCommentStore";
import moment from "moment";
import { LoaderCircle, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import { useParams } from "react-router-dom";

const DisplayComments = () => {
  const { comments, loading, deletecomment } = useCommentStore();
  const { user } = useAuthStore();
  const { id } = useParams();
  const [showComments, setShowComments] = useState(true);

  const handleDelete = (cid) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deletecomment(cid, id);
    }
  };

  return (
    <div className="mt-4">
      {/* Toggle Button */}
      <button
        onClick={() => setShowComments((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 text-sm font-medium transition text-emerald-400 hover:text-emerald-300"
      >
        {showComments ? "Hide Comments" : "Show Comments"}
        {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showComments && (
        <div className="mt-2 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <LoaderCircle className="w-6 h-6 animate-spin text-emerald-500" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm italic text-center text-gray-400">
              No comments yet.
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-3 p-4 border shadow-md bg-black/70 border-emerald-500/10 rounded-2xl backdrop-blur-md"
              >
                <img
                  src={comment.user?.profilePic || "/default-avatar.png"}
                  alt="profile"
                  className="object-cover w-10 h-10 border rounded-full border-emerald-400/30"
                />
                <div className="relative flex flex-col w-full group">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-400">
                      {comment.user._id === user._id
                        ? "You"
                        : comment.user?.username}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-zinc-200">
                    {comment.text}
                  </p>

                  {user._id === comment.user._id && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="absolute bottom-0 right-0 p-1 text-zinc-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayComments;
