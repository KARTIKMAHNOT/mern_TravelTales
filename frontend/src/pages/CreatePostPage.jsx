import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Camera, MapPin, FileText, Plus, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePostStore } from "../stores/usePostStore";
import LoadingSpinner from "../components/LoadingSpinner";
const CreatePostPage = () => {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {addPost, loading} = usePostStore()

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    }); 

    
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 6) {
      alert("You can upload a maximum of 6 images");
      return;
    }

    const base64Images = await Promise.all(files.map(toBase64));
    const previews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...base64Images]);
    setImagePreviews((prev) => [...prev, ...previews]); 
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    const revokedUrl = newPreviews[index];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);

    setTimeout(() => {
      URL.revokeObjectURL(revokedUrl);
    }, 0);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption || images.length === 0) {
      alert("Please provide a caption and at least one image.");
      return;
    }
    await addPost({
      caption,
      description,
      location,
      images,
    });
    
    setCaption("");
    setLocation({
      city: "",
      country: "",
    });
    setDescription("");
    setImages([]);
    setImagePreviews([]);
  };

  if(loading) return <LoadingSpinner/>
  return (
    <div className="min-h-screen overflow-hidden text-white bg-gradient-to-br from-slate-900 to-black">
      {/* Rotating Squares Background */}
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-black/90" />
      </div>

      {/* Content Container */}
      <div className="container max-w-4xl px-4 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-zinc-900/70 to-zinc-800/80 backdrop-blur-lg rounded-3xl border border-emerald-500/20 p-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h2
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Create New Journey Post
            </motion.h2>
            <motion.p
              className="mt-2 text-emerald-400/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Share your travel experiences with the world
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Caption Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label className="block mb-2 text-emerald-300">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Caption
                </span>
              </label>
              <input
                type="text"
                placeholder="Give your journey a title..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-4 border rounded-xl bg-black/30 border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                required
              />
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full"></div>
            </motion.div>

            {/* Description Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <label className="block mb-2 text-emerald-300">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </span>
              </label>
              <textarea
                placeholder="Tell us about your experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[120px] p-4 rounded-xl bg-black/30 border border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
              ></textarea>
            </motion.div>

            {/* Location Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <label className="block mb-2 text-emerald-300">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </span>
              </label>
              <input
                type="text"
                placeholder="City"
                value={location.city}
                onChange={(e) =>
                  setLocation((prev) => ({ ...prev, city: e.target.value }))
                }
                className="w-[45%] p-4 mr-1 border rounded-xl bg-black/30 border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />

              <input
                type="text"
                placeholder="Country"
                value={location.country}
                onChange={(e) =>
                  setLocation((prev) => ({ ...prev, country: e.target.value }))
                }
                className="w-[45%] p-4 border rounded-xl bg-black/30 border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </motion.div>

            {/* Image Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <label className="block mb-2 text-emerald-300">
                <span className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Photos
                </span>
              </label>

              <div className="p-6 border-2 border-dashed rounded-2xl border-emerald-500/30 bg-black/20">
                <label className="flex flex-col items-center justify-center gap-3 cursor-pointer">
                  <div className="p-4 rounded-full bg-emerald-500/20">
                    <Plus className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-center text-emerald-300">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-sm text-emerald-400/70">
                    Maximum 6 images (JPEG, PNG)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-emerald-300">Selected Images</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="relative group">
                          <div className="relative h-40 overflow-hidden border rounded-xl border-emerald-500/30">
                            <img
                              src={src}
                              alt={`preview-${i}`}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute p-1 transition rounded-full top-2 right-2 bg-red-600/90 hover:bg-red-500"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                            <div className="absolute px-2 py-1 text-xs rounded bottom-2 left-2 bg-black/50">
                              Image {i + 1}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="
                w-full mt-8 py-4 rounded-xl
                bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold
                flex items-center justify-center gap-2
                transition-all duration-300
                shadow-[0_0_15px_rgba(16,185,129,0.4)]
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Share Journey
            </motion.button>
            <Link to="/">
              <div className="relative flex justify-center gap-2 mt-4">
                <MoveLeft className="mt-2 duration-300 scale-110 mt-transition-colors w-7 h-7 text-emerald-500 group-hover:text-white hover:text-emerald-200 hover:scale-150" />
              </div>
            </Link>
          </form>

          {/* Decorative Elements */}
          <div className="absolute w-12 h-12 rounded-full -top-6 -left-6 bg-emerald-500/10 blur-xl" />
          <div className="absolute w-16 h-16 rounded-full -bottom-6 -right-6 bg-emerald-500/10 blur-xl" />
          <motion.div
            className="absolute w-3 h-3 border top-4 left-4 border-emerald-400/30"
            animate={{
              rotate: 360,
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-3 h-3 border bottom-4 right-4 border-emerald-400/30"
            animate={{
              rotate: -360,
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostPage;
