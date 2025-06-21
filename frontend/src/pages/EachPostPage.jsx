import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PostDetail from "../components/PostDetail";
import CommentSection from "../components/CommentSection";
import GetRecommendedPost from "../components/GetRecommendedPost";
import { usePostStore } from "../stores/usePostStore";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCommentStore } from "../stores/useCommentStore";

const EachPostPage = () => { 
  const { fetchRecommended, loading, fetchCurrPost} = usePostStore();
  const { id } = useParams();
  const {getcomments} = useCommentStore()
  
  console.log("Current postid:", id);

  useEffect(() => {
    fetchCurrPost(id);
  }, [id, fetchCurrPost]);
  
  useEffect(() => {
    fetchRecommended();
  }, [id, fetchRecommended]);
  
  useEffect(()=>{
    getcomments(id)
  },[id,getcomments])

  

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <div className="flex-grow px-4 pt-20 md:px-8">
        <section className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-2/3">
            <PostDetail />
          </div>
          <div className="w-full md:w-1/3 max-h-[80vh] overflow-y-auto bg-zinc-900 rounded-lg p-4">
            <CommentSection />
          </div>
        </section>
        <section className="px-2 py-6 mt-10 border-t bg-black/90 border-emerald-500/20">
          <h2 className="mb-4 text-xl font-semibold">You may also like</h2>
          <GetRecommendedPost />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default EachPostPage;
