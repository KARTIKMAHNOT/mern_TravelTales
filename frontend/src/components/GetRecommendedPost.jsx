import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePostStore } from "../stores/usePostStore";
import { useEffect } from "react";

const GetRecommendedPost = () => {
    const {recommendedPost} = usePostStore()
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {recommendedPost.map((post) => (
        <div
          key={post._id}
          className="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src={post.images?.[0].url || "/fallback.jpg"}
            alt={post.location.city || "Post Image"}
            className="object-cover w-full h-48"
            loading="lazy"
          />
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg font-semibold truncate text-emerald-400">
              {post.location.city } -{post.location.country}
            </h3>
            <Link to={`/view-post/${post._id}`}>
              <span className="px-4 py-1 mt-2 text-sm text-white rounded bg-emerald-600 hover:bg-emerald-700">
                View Post
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetRecommendedPost;
