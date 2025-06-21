import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { usePostStore } from "../stores/usePostStore";
import { useCommentStore } from "../stores/useCommentStore";

const TypeComment = () => {
  const [comment, setComment] = useState("");
  const { currPost } = usePostStore();
  const {addcomments} = useCommentStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addcomments(comment,currPost._id);
    setComment("");
  }
  return (
    <div className="w-full px-4 py-3 border shadow-md bg-black/95 rounded-xl border-emerald-500/20">
      <form onSubmit={handleSubmit}>
        <div className="flex items-end gap-2">
          <div className="relative w-full">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 pr-12 text-white border rounded-lg resize-none bg-zinc-800 border-zinc-700 focus:outline-none"
              rows={3}
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              className="absolute p-2 text-white transition rounded-full bottom-2 right-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TypeComment;
