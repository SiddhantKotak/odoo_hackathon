import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

const Photo = (username: string) => {
  return (
    <button className="flex justify-center gap-2 items-center">
      <div className="w-[3.5rem] h-[3.5rem] rounded-full flex justify-center text-2xl items-center bg-black text-white">
        {username[0].toUpperCase()}
      </div>
      <TiArrowSortedDown size={25} />
    </button>
  );
};

const Navbar = () => {
  const { loggedIn, username } = useContext(AppContext) as Context;
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg h-[4rem] md:h-[5rem] flex justify-between ">
      <a
        href=""
        className="md:border max-w-[12rem] h-full md:flex-shrink-0 flex items-center justify-center md:px-4 lg:px-6 xl:px-8"
      >
        <span className="text-xl font-bold">DallaSphere</span>
      </a>
      <div className="md:hidden border w-[4rem] flex items-center justify-center">
        <a>
          <GiHamburgerMenu />
        </a>
      </div>
      <nav className=" hidden md:contents font-semibold  text-base lg:text-lg">
        <ul className="flex items-center ml-4 xl:ml-8 mr-auto">
          <li className="p-3 xl:p-6 active">
            <a href="">
              <div className="hover:bg-slate-500 w-[6rem] h-[2.5rem] items-center  transition duration-200 rounded-xl flex justify-center">
                Home
              </div>
            </a>
          </li>
          <li className="p-3 xl:p-6">
            <a href="">
              <div className="hover:bg-slate-500 w-[7rem] h-[2.5rem] items-center  transition duration-200 rounded-xl flex justify-center">
                Services
              </div>
            </a>
          </li>
          <li className="p-3 xl:p-6">
            <a href="">
              <div className="hover:bg-slate-500 w-[6rem] h-[2.5rem] items-center  transition duration-200 rounded-xl flex justify-center">
                About
              </div>
            </a>
          </li>

          <li className="p-3 xl:p-6">
            <a href="">
              <div className="hover:bg-slate-500 w-[8rem] h-[2.5rem] items-center  transition duration-200 rounded-xl flex justify-center">
                Contacts
              </div>
            </a>
          </li>
        </ul>
      </nav>

      <div className="border  items-center px-4 lg:px-6 hidden md:flex xl:px-8 gap-6">
        {loggedIn ? (
          Photo(username)
        ) : (
          <>
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold px-6 xl:px-8 py-2 xl:py-3 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
