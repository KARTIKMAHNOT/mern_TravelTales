import React, { useEffect, useState, useRef } from "react";
import { usePostStore } from "../stores/usePostStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Image,
  ChevronLeft,
  ChevronRight,
  Search,
  Globe,
  Compass,
  Mountain,
  Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useDebounce } from "use-debounce";

const ImageSlider = ({ images }) => {
  const safeImages = Array.isArray(images) ? images : [];

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    duration: 1000,
  });

  const goPrev = () => instanceRef.current?.prev();
  const goNext = () => instanceRef.current?.next();

  return (
    <div
      className="relative overflow-hidden keen-slider h-60 rounded-t-2xl"
      ref={sliderRef}
    >
      {safeImages.map((img, i) => (
        <div
          key={img.publicId || i}
          className="flex items-center justify-center keen-slider__slide bg-black/50"
        >
          <img
            src={img.url}
            alt={`Slide ${i}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      <button
        onClick={goPrev}
        className="absolute z-10 p-2 text-white -translate-y-1/2 rounded-full bg-emerald-500/80 top-1/2 left-2 hover:bg-emerald-400"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goNext}
        className="absolute z-10 p-2 text-white -translate-y-1/2 rounded-full bg-emerald-500/80 top-1/2 right-2 hover:bg-emerald-400"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute px-2 py-1 text-xs rounded bottom-2 right-2 bg-black/60">
        {safeImages.length} photo{safeImages.length > 1 && "s"}
      </div>
    </div>
  );
};

const TravelIcon = ({ icon: Icon, index }) => (
  <motion.div
    className="p-3 rounded-full bg-emerald-500/10"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.1 * index, duration: 0.5 }}
  >
    <Icon className="w-6 h-6 text-emerald-400" />
  </motion.div>
);

const Posts = () => {
  const { postsData, fetchAllPosts, loading, fetchSearchedPosts } =
    usePostStore();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 700);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const isInitialMount = useRef(true);

  const limit = 8;

  // Combined fetch effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedSearch.trim()) {
          setIsSearchActive(true);
          await fetchSearchedPosts(debouncedSearch, page, limit);
          setSearchError(null);
        } else {
          setIsSearchActive(false);
          await fetchAllPosts(page, limit);
        }
      } catch (err) {
        console.error("Search error:", err);
        setSearchError("Failed to fetch search results. Please try again.");
      }
    };

    // Don't run on initial mount to prevent double fetch
    if (!isInitialMount.current) {
      fetchData();
    } else {
      isInitialMount.current = false;
    }
  }, [debouncedSearch, page]);

  // Reset page to 1 when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setPage(1);
    }
  }, [searchQuery]);

  const safePosts = postsData?.posts || [];
  const currentPage = postsData?.currentPage || 1;
  const totalPages = postsData?.totalPages || 1;

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setPage(1);
      setIsSearchActive(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen px-4 py-12 text-white bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Branding Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center justify-center gap-2 px-6 py-3 mx-auto mb-6 border rounded-full border-emerald-500/30 bg-emerald-500/10"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Globe className="w-5 h-5 text-emerald-300" />
            <h1 className="text-2xl font-bold tracking-wider text-emerald-300">
              TravelTales
            </h1>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4 text-3xl font-bold text-center md:text-4xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
              Discover Global Adventures
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto text-lg text-emerald-200/80"
          >
            Explore authentic travel experiences shared by our global community
            of adventurers. Find inspiration for your next journey.
          </motion.p>
        </motion.div>

        {/* Travel Icons Row */}
        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[Compass, Mountain, Plane, Globe].map((Icon, index) => (
            <TravelIcon key={index} icon={Icon} index={index} />
          ))}
        </motion.div>

        {/* Search Input */}
        <div className="flex flex-col items-center justify-center mb-10 ">
          <div className="relative flex items-center justify-center w-full max-w-md mx-auto ">
            <Search className="absolute left-4 text-emerald-400 " />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-3 pl-10 pr-4 text-white transition bg-black border rounded-xl border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            />
          </div>
          <div className="mt-3 text-emerald-500">Search by Creator, Country or City</div>
        </div>
        {/* Error Message */}
        {searchError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md p-4 mx-auto mb-8 text-center text-red-300 border bg-red-900/30 border-red-500/30 rounded-xl"
          >
            <p>{searchError}</p>
          </motion.div>
        )}

        {/* Posts Section */}
        <div className="mb-8 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="inline-block px-6 py-2 mb-2 text-lg font-medium rounded-full bg-emerald-500/10 text-emerald-300"
          >
            {isSearchActive
              ? `Search Results for "${searchQuery}"`
              : "Latest Travel Stories"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-emerald-400/80"
          >
            {isSearchActive
              ? "Matching adventures from our community"
              : "Browse through our community's most recent adventures"}
          </motion.p>
        </div>

        {safePosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md p-12 mx-auto text-center border bg-black/30 border-emerald-500/20 rounded-3xl backdrop-blur-lg"
          >
            <div className="p-4 mx-auto mb-6 rounded-full bg-emerald-500/20 w-fit">
              {isSearchActive ? (
                <Search className="w-12 h-12 text-emerald-400" />
              ) : (
                <Image className="w-12 h-12 text-emerald-400" />
              )}
            </div>
            <h2 className="mb-3 text-xl font-medium text-emerald-300">
              {isSearchActive
                ? "No Matching Adventures Found"
                : "No Posts Available"}
            </h2>
            <p className="text-emerald-400/80">
              {isSearchActive
                ? `No posts match "${searchQuery}". Try different search terms.`
                : "Be the first to share your travel experience!"}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {safePosts.map((post) => {
                  const images = Array.isArray(post.images) ? post.images : [];

                  return (
                    <motion.div
                      key={post._id}
                      className="relative overflow-hidden bg-black/30 border border-emerald-500/20 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-md group"
                      whileHover={{ y: -10 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ImageSlider images={images} />

                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between">
                          <h2 className="text-xl font-semibold transition-colors text-emerald-300 group-hover:text-emerald-200">
                            {post.caption}
                          </h2>
                          <Link to={`/view-post/${post._id}`}>
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 text-sm font-semibold text-black transition-colors rounded-2xl bg-emerald-500 hover:bg-emerald-400"
                            >
                              Explore
                            </motion.span>
                          </Link>
                        </div>

                        {post.location && (
                          <div className="flex items-center gap-2 pt-2 mt-2 text-sm transition-colors border-t border-emerald-500/20 text-emerald-400/80 group-hover:text-emerald-300">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {post.location.city}, {post.location.country}
                            </span>
                          </div>
                        )}

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

                      <div className="absolute inset-0 z-10 transition-opacity opacity-0 pointer-events-none bg-gradient-to-t from-emerald-500/30 to-transparent group-hover:opacity-100" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-14">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-5 py-2 text-sm transition-colors border rounded-2xl border-emerald-400 bg-emerald-500/10 hover:bg-emerald-600/30 disabled:opacity-50"
              >
                Previous
              </motion.button>
              <span className="text-sm text-emerald-300">
                Page {currentPage} of {totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="px-5 py-2 text-sm transition-colors border rounded-2xl border-emerald-400 bg-emerald-500/10 hover:bg-emerald-600/30 disabled:opacity-50"
              >
                Next
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
