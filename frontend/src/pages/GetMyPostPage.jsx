import React, { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { usePostStore } from "../stores/usePostStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Image,
  Trash2,
  X,
  ThumbsUp,
  MessageSquareText,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import LoadingSpinner from "../components/LoadingSpinner";

const ImageSlider = ({ images }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    duration: 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div
      ref={sliderRef}
      className="relative overflow-hidden keen-slider h-60 rounded-t-2xl"
    >
      {images.map((img, index) => (
        <div
          key={img.publicId || index}
          className="flex items-center justify-center keen-slider__slide bg-black/50"
        >
          <img
            src={img.url}
            alt={`Post image ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      <div className="absolute px-2 py-1 text-xs rounded bottom-2 right-2 bg-black/60">
        {images.length} photo{images.length > 1 && "s"}
      </div>
    </div>
  );
};

const GetMyPostPage = () => {
  const { myPostsData, loading, deletePost, fetchMyPost } = usePostStore();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    fetchMyPost(page, limit);
  }, [page]);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully");
      setConfirmDeleteId(null);
      fetchMyPost(page, limit);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
      setConfirmDeleteId(null);
    }
  };
  if(loading) return <LoadingSpinner/>
  return (
    <div className="min-h-screen px-4 py-12 text-white bg-gradient-to-br from-slate-900 to-black">
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => {
          const size = 50 + Math.random() * 150;
          const duration = 15 + Math.random() * 20;
          const delay = Math.random() * 5;
          const rotation = Math.random() * 360;

          return (
            <motion.div
              key={i}
              className="absolute border border-emerald-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                rotate: `${rotation}deg`,
              }}
              animate={{
                rotate: [rotation, rotation + 360],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-black/90" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500"
        >
          My Travel Tales
        </motion.h1>

        {myPostsData.posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md p-12 mx-auto text-center border bg-black/30 border-emerald-500/20 rounded-3xl backdrop-blur-lg"
          >
            <div className="p-4 mx-auto mb-6 rounded-full bg-emerald-500/20 w-fit">
              <Image className="w-12 h-12 text-emerald-400" />
            </div>
            <h2 className="mb-3 text-xl font-medium text-emerald-300">
              No Journeys Shared Yet
            </h2>
            <p className="text-emerald-400/80">
              Start sharing your travel experiences with the world
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {myPostsData.posts.map((post) => (
                  <motion.div
                    key={post._id}
                    className="relative overflow-hidden bg-black/30 border border-emerald-500/20 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-md"
                    whileHover={{ y: -10 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute z-10 p-2 rounded-full top-4 right-4 bg-red-600/80 hover:bg-red-500 backdrop-blur-sm"
                      onClick={() => setConfirmDeleteId(post._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>

                    <ImageSlider images={post.images} />

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-semibold text-emerald-300">
                          {post.caption}
                        </h2>
                        <Link to={`/view-post/${post._id}`}>
                          <span className="p-2 font-semibold text-black rounded-2xl bg-emerald-500 hover:bg-emerald-300/70">
                            View Post
                          </span>
                        </Link>
                      </div>

                      {post.location && (
                        <div className="flex items-center gap-2 pt-2 mt-2 text-sm border-t border-emerald-500/20 text-emerald-400/80">
                          <MapPin className="flex-shrink-0 w-4 h-4" />
                          <div className="flex flex-col">
                            <span className="truncate">
                              {post.location.city} - {post.location.country}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-5 pt-2 mt-2 text-sm border-t border-emerald-500/20 text-emerald-400/80">
                        <div className="flex gap-2">
                          <ThumbsUp className="flex-shrink-0 w-4 h-4" />
                          <div className="flex flex-col">
                            <span className="truncate">
                              {post.likes.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Published
                        </span>
                      </div>
                    </div>
                    {confirmDeleteId === post._id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                        <div className="p-6 bg-zinc-800/90 rounded-xl border border-emerald-500/20 max-w-[90%]">
                          <h3 className="mb-3 font-medium text-emerald-300">
                            Delete this post?
                          </h3>
                          <p className="mb-4 text-sm text-gray-300">
                            This action cannot be undone. All images and data
                            will be permanently removed.
                          </p>
                          <div className="flex gap-3">
                            <button
                              className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-600/80 hover:bg-red-500"
                              onClick={() => handleDelete(post._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                            <button
                              className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-zinc-700 hover:bg-zinc-600"
                              onClick={() => setConfirmDeleteId(null)}
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-emerald-300">
                Page {myPostsData.currentPage} of {myPostsData.totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(myPostsData.totalPages, prev + 1))
                }
                disabled={page === myPostsData.totalPages}
                className="px-4 py-2 text-sm rounded bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GetMyPostPage;
