/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPinned, Menu, X, User,Pen } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {user} = useAuthStore()
  const profileImage = user?.profilePic || "/avatar.svg";

  return (
    <>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-lg"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          fixed top-0 w-full z-50
          bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-lg
          border-b border-emerald-500/20
          text-white h-20 px-4 sm:px-6 md:px-12
          flex items-center justify-between
          shadow-[0_8px_32px_rgba(0,0,0,0.7)]
        "
      >
        <Link to="/" className="relative flex items-center gap-2 group">
          <div className="relative">
            <MapPinned className="transition-colors duration-300 w-7 h-7 text-emerald-300 group-hover:text-white" />
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-[8px] opacity-40 group-hover:opacity-60 group-hover:blur-[10px] transition-all duration-300 -z-10" />
          </div>

          <span className="relative">
            <span className="text-2xl font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-emerald-200 to-emerald-400 drop-shadow-[0_0_6px_rgba(110,231,183,0.7)] group-hover:drop-shadow-[0_0_12px_rgba(110,231,183,0.9)] transition-all duration-300">
              TravelTales
            </span>

            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-300/0 via-emerald-300 to-emerald-300/0 transition-all duration-500 group-hover:w-full"></span>
          </span>
        </Link>
        <div className="items-center hidden gap-4 md:flex">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="
                  relative px-5 py-2.5 rounded-xl
                  border border-emerald-500/30
                  text-emerald-300 font-medium
                  group
                  overflow-hidden
                "
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Sign Up
                </span>
                <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-500/10 to-transparent group-hover:opacity-100" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full" />
              </Link>

              <Link
                to="/login"
                className="
                  relative px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-emerald-500 to-emerald-600
                  text-black font-bold
                  group
                  overflow-hidden
                  shadow-[0_0_15px_rgba(16,185,129,0.4)]
                "
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                <motion.span
                  whileHover={{
                    boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
                  }}
                  className="absolute inset-0"
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create-post"
                className="
                  relative px-5 py-2.5 rounded-xl
                  border border-emerald-500/30
                  text-emerald-300 font-medium
                  group
                  overflow-hidden
                "
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  <Pen />
                </span>
                <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-500/10 to-transparent group-hover:opacity-100" />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full" />
              </Link>
              <Link to="/myprofile">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                  relative ml-2 w-11 h-11 rounded-full overflow-hidden
                  ring-2 ring-emerald-400/50
                  shadow-[0_0_10px_rgba(16,185,129,0.5)]
                  transition-transform duration-200
                  cursor-pointer
                "
                >
                  <div className="absolute inset-0 bg-emerald-500/20 blur-[10px] -z-10" />
                  <img
                    src={profileImage}
                    alt="Profile"
                    onError={(e) => (e.target.src = "/default.png")}
                    className="object-cover object-center w-full h-full"
                  />
                </motion.div>
              </Link>
            </>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 border rounded-lg md:hidden bg-zinc-800/50 border-emerald-500/20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-emerald-300" />
          ) : (
            <Menu className="w-6 h-6 text-emerald-300" />
          )}
        </motion.button>
      </motion.nav>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed top-0 right-0 z-50 h-full p-6 pt-24 border-l shadow-2xl w-80 bg-gradient-to-br from-zinc-900 to-zinc-800 backdrop-blur-lg border-emerald-500/20"
      >
        <div className="flex flex-col gap-6">
          <div className="pb-6 border-b border-emerald-500/20">
            <div className="flex items-center gap-4 mb-8">
              
              <div>
                <p className="text-lg font-medium text-emerald-300">
                  Hello {user?.username || "Guest"} !!!
                </p>
                <p className="text-sm text-gray-400">
                  {user ? "" : "Not signed in"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className="relative px-5 py-3 overflow-hidden font-medium text-center border rounded-xl border-emerald-500/30 text-emerald-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Sign Up
                  </span>
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-500/10 to-transparent group-hover:opacity-100" />
                </Link>

                <Link
                  to="/login"
                  className="
                    relative px-5 py-3 rounded-xl
                    bg-gradient-to-r from-emerald-500 to-emerald-600
                    text-black font-bold
                    group
                    overflow-hidden
                    shadow-[0_0_15px_rgba(16,185,129,0.4)]
                    text-center
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/myprofile"
                  className="relative px-5 py-3 overflow-hidden font-medium text-center border rounded-xl border-emerald-500/30 text-emerald-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    View Profile
                  </span>
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-emerald-500/10 to-transparent group-hover:opacity-100" />
                </Link>
                <Link
                  to="/create-post"
                  className="
                    relative px-5 py-3 rounded-xl
                    bg-gradient-to-r from-emerald-500 to-emerald-600
                    text-black font-bold
                    group
                    overflow-hidden
                    shadow-[0_0_15px_rgba(16,185,129,0.4)]
                    text-center
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Create Post</span>
                  <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
                </Link>
              </>
            )}
          </div>

          <div className="pt-6 mt-8 border-t border-emerald-500/20">
            <p className="text-sm text-center text-emerald-300/70">
              TravelTales &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavBar;