import React from "react";
import NavBar from "../components/NavBar";
import Posts from "../components/Posts";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black/95">
      <NavBar />

      <div className="pt-20">
        <Posts />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
