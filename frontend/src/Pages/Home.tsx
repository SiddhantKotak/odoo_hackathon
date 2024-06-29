// import GoogleButton from "../Components/GoogleButton";
import Navbar from "../Components/Navbar";
import React from "react";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import HomeCards from "../Components/HomeCards";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <HomeCards />
      <Footer />
    </div>
  );
};

export default Home;
