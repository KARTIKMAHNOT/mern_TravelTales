/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LogIn,
  MapPinned,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-gradient-to-br from-black to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 300}px`,
              height: `${100 + Math.random() * 300}px`,
              background: `radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
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

      {/* Card Container with entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-md p-8 rounded-2xl
          bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-lg
          border border-emerald-500/20
          shadow-[0_0_30px_rgba(16,185,129,0.2)]
          relative overflow-hidden
        "
      >
        {/* Animated card border */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `conic-gradient(
              from 90deg at 50% 50%,
              rgba(16,185,129,0) 0deg,
              rgba(16,185,129,0.5) 180deg,
              rgba(16,185,129,0) 360deg
            )`,
            mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            maskComposite: "exclude",
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-3xl font-medium text-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
            Welcome Back
          </span>
        </motion.h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <label className="block mb-2 text-sm font-medium text-emerald-300/90">
              Email
            </label>
            <div className="relative group">
              <motion.div
                className="absolute left-3 top-2.5"
                whileHover={{ scale: 1.2 }}
              >
                <Mail className="w-5 h-5 text-emerald-300" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-[6px] opacity-30 -z-10" />
              </motion.div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-black/30 text-white
                  border border-emerald-500/30
                  placeholder-emerald-300/40
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]
                  transition-all duration-300
                "
              />
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full" />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label className="block mb-2 text-sm font-medium text-emerald-300/90">
              Password
            </label>
            <div className="relative group">
              {/* Lock icon with glow */}
              <motion.div
                className="absolute left-3 top-2.5"
                whileHover={{ scale: 1.2 }}
              >
                <Lock className="w-5 h-5 text-emerald-300" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-[6px] opacity-30 -z-10" />
              </motion.div>

              {/* Password input */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
        w-full pl-10 pr-10 py-3 rounded-xl
        bg-black/30 text-white
        border border-emerald-500/30
        placeholder-emerald-300/40
        focus:outline-none focus:ring-2 focus:ring-emerald-500/50
        hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]
        transition-all duration-300
      "
              />

              {/* Eye icon toggle */}
              <div
                className="absolute right-3 top-2.5 cursor-pointer text-emerald-300 hover:text-emerald-400 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </div>

              {/* Hover underline glow */}
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full" />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="
              w-full mt-4 py-3 rounded-xl
              bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-bold
              flex items-center justify-center gap-2
              transition-all duration-300
              shadow-[0_0_20px_rgba(16,185,129,0.3)]
              relative overflow-hidden
            "
          >
            <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-white/20 to-transparent group-hover:opacity-100" />
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span className="relative">LogIn</span>
              </>
            )}
          </motion.button>
        </form>

        {/* "New here?" Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            to="/signup"
            className="relative inline-block text-sm font-medium group"
          >
            <span className="transition-colors duration-300 text-emerald-300/90 group-hover:text-emerald-200">
              New here? Sign Up
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 transition-all duration-500 group-hover:w-full" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
