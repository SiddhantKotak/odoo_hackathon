// import GoogleButton from "../Components/GoogleButton";
import Navbar from "../Components/Navbar";
import React from "react";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import HomeCards from "../Components/HomeCards";
import DropDown from "../Components/DropDown";
import { useContext } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";

const Home = () => {
  const { dropdown } = useContext(AppContext) as Context;
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <HomeCards />
      <Footer />
      {dropdown ? <DropDown /> : null}
    </div>
  );
};

export default Home;
