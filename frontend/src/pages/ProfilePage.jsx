/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Pencil, Save, X, LogOut, MapPinned } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // Existing functionality remains unchanged
  const { user, loading, updateProfile, logout } = useAuthStore();
  const [bio, setBio] = useState(user?.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleBioUpdate = async () => {
    try {
      await updateProfile({ bio });
      setIsEditing(false);
      toast.success("Bio updated successfully");
    } catch (error) {
      console.log("Error updating bio:", error);
      toast.error("Failed to update bio");
      setIsEditing(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
      toast.success("Profile picture updated successfully");
    };
  };

  if (!user) return <p className="text-white">Loading...</p>;

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
      <Link
        to="/"
        className="absolute z-10 flex items-center gap-2 group top-6 left-6"
      >
        <div className="relative">
          <MapPinned className="transition-all duration-300 w-7 h-7 text-emerald-300 group-hover:text-white" />
          <div className="absolute inset-0 bg-emerald-400 rounded-full blur-[10px] opacity-40 group-hover:opacity-60 group-hover:blur-[12px] transition-all duration-300 -z-10" />
        </div>

        <span className="relative">
          <span className="text-2xl font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-emerald-200 to-emerald-400 drop-shadow-[0_0_6px_rgba(110,231,183,0.7)] group-hover:drop-shadow-[0_0_12px_rgba(110,231,183,0.9)] transition-all duration-300">
            TravelTales
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-300/0 via-emerald-300 to-emerald-300/0 transition-all duration-500 group-hover:w-full" />
        </span>
      </Link>

      {/* Profile Card */}
      <div className="container max-w-md px-4 py-24 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-zinc-900/70 to-zinc-800/80 backdrop-blur-lg rounded-3xl border border-emerald-500/20 p-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
        >
          {/* Profile Picture */}
          <div className="relative mx-auto mb-6 w-44 h-44">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
            >
              <img
                src={selectedImg || user.profilePic || "/avatar.svg"}
                alt="Profile"
                className="object-cover w-full h-full"
              />

              {/* Camera Button */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-3 right-3 w-10 h-10 rounded-full bg-emerald-600/90
                  flex items-center justify-center cursor-pointer shadow-lg
                  border border-emerald-400/50
                  ${loading ? "animate-pulse" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={loading}
                />
              </label>
            </motion.div>

            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl -z-10 animate-pulse" />
          </div>

          {/* User Info */}
          <motion.h1
            className="mb-2 text-3xl font-bold text-center text-emerald-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {user.username}
          </motion.h1>

          <motion.p
            className="mb-8 text-lg text-center text-emerald-400/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user.email}
          </motion.p>

          {/* Bio Section */}
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <motion.h2
                className="text-xl font-medium text-emerald-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Bio
              </motion.h2>

              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 transition rounded-lg bg-emerald-600/30 hover:bg-emerald-500/40"
                  onClick={() => setIsEditing(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Pencil className="w-5 h-5 text-emerald-300" />
                </motion.button>
              ) : null}
            </div>

            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="
                    w-full min-h-[120px] p-4 rounded-xl
                    bg-black/30 text-white
                    border border-emerald-500/40
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                    resize-none
                  "
                />
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-5 py-2 font-medium text-white rounded-xl bg-emerald-600"
                    onClick={handleBioUpdate}
                    disabled={loading}
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 px-5 py-2 font-medium text-white rounded-xl bg-zinc-700"
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.p
                className="p-4 text-center border rounded-xl bg-black/30 border-emerald-500/20 text-emerald-200/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {user.bio || "No bio yet. Click the pencil icon to add one!"}
              </motion.p>
            )}
          </div>
          <Link to='/myPosts'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-2 mt-2 transition rounded-lg bg-emerald-600/30 hover:bg-emerald-500/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-emerald-200">My Posts</span>
            </motion.button>
          </Link>
          {/* Logout Button */}
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full mt-8 py-3 rounded-xl
              bg-gradient-to-r from-red-600 to-red-700 text-white font-bold
              flex items-center justify-center gap-2
              transition-all duration-300
              shadow-[0_0_10px_rgba(220,38,38,0.3)]
            "
            onClick={logout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <LogOut className="w-3 h-3" />
            Logout
          </motion.button>

          {/* Decorative Elements */}
          <div className="absolute w-12 h-12 rounded-full -top-6 -left-6 bg-emerald-500/10 blur-xl" />
          <div className="absolute w-16 h-16 rounded-full -bottom-6 -right-6 bg-emerald-500/10 blur-xl" />

          {/* Animated Corner Squares */}
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

export default ProfilePage;
