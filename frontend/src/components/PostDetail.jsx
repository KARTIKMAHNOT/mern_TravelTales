import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  User,
  Heart,
  Calendar,
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import moment from "moment";
import { usePostStore } from "../stores/usePostStore";
import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    renderMode: "performance",
  });

  const { currPost, toggleLike } = usePostStore();
  const { user } = useAuthStore();
  const isLiked = currPost?.likes?.includes(user._id);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    instanceRef.current?.on("slideChanged", (slider) => {
      setCurrentSlide(slider.track.details.rel);
    });
  }, [instanceRef]);

  if (!currPost) return null;

  const slideLeft = () => instanceRef.current?.prev();
  const slideRight = () => instanceRef.current?.next();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Author Header */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={currPost.creator?.profilePic || "/avatar.svg"}
            alt="creator"
            className="object-cover w-12 h-12 border-2 rounded-full border-emerald-500/50"
          />
        </div>
        <div>
        
            <h3 className="text-lg font-bold tracking-wide text-white transition-colors">
              {currPost.creator?.username}
            </h3>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
            <Calendar className="w-4 h-4" />
            <span>{moment(currPost.createdAt).fromNow()}</span>
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative overflow-hidden rounded-xl">
        <div ref={sliderRef} className="keen-slider">
          {currPost.images?.map((img, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-center keen-slider__slide"
            >
              <img
                src={img.url}
                alt={`post-${idx}`}
                className="object-cover w-full max-h-[400px]"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {currPost.images?.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={slideLeft}
              className="absolute z-10 p-2 text-white transition-colors -translate-y-1/2 rounded-full top-1/2 left-2 bg-black/50 backdrop-blur-sm hover:bg-emerald-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={slideRight}
              className="absolute z-10 p-2 text-white transition-colors -translate-y-1/2 rounded-full top-1/2 right-2 bg-black/50 backdrop-blur-sm hover:bg-emerald-500"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}

        {/* Slide Indicator */}
        {currPost.images?.length > 1 && (
          <div className="absolute left-0 right-0 flex justify-center bottom-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              {currPost.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === idx ? "bg-emerald-400" : "bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center gap-3 text-zinc-300">
        <MapPin className="w-5 h-5 text-emerald-500" />
        <span className="font-medium">
          {currPost.location?.city}, {currPost.location?.country}
        </span>
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <h4 className="text-xl font-bold tracking-wide text-white">
          Travel Experience
        </h4>
        <p className="leading-relaxed text-zinc-300">{currPost.description}</p>
      </div>

      {/* Like Section */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-700">
        <div className="flex items-center gap-2 text-zinc-400">
          <Heart className="w-5 h-5 text-emerald-500" />
          <span>
            {currPost.likes?.length || 0}{" "}
            {currPost.likes?.length === 1 ? "like" : "likes"}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleLike()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isLiked
              ? "text-white bg-emerald-600"
              : "text-zinc-300 bg-zinc-800 hover:bg-emerald-500/20"
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
          {isLiked ? "Liked" : "Like"}
        </motion.button>
      </div>

      {/* Date Footer */}
      <div className="flex items-center gap-2 pt-3 text-sm text-center border-t text-zinc-500 border-zinc-700">
        <Calendar className="w-4 h-4" />
        <span>{moment(currPost.createdAt).format("MMMM Do YYYY, h:mm A")}</span>
      </div>
    </motion.div>
  );
};

export default PostDetail;
