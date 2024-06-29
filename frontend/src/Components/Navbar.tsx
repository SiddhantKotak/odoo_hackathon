import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import DropDown from "./DropDown";

const Photo = (
  username: string,
  dropdown: boolean,
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <button
      onClick={() => {
        setDropdown(!dropdown);
      }}
      className="flex justify-center gap-2 items-center"
    >
      <div className="w-[3.5rem] h-[3.5rem] rounded-full flex justify-center text-2xl items-center bg-black text-white">
        {username[0].toUpperCase()}
      </div>
      <TiArrowSortedDown size={25} />
    </button>
  );
};

const Navbar = () => {
  const { loggedIn, username, dropdown, setDropdown } = useContext(
    AppContext
  ) as Context;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      Search(search);
    }
  }

  function goToCart() {
    navigate("/cart");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function Search(value: string) {
    navigate(`/search/${value}`);
  }

  return (
    <div className="relative">
      {dropdown ? <DropDown /> : null}
      <div className="bg-white w-screen border-b-black fixed z-10 shadow-lg h-[4rem] md:h-[5rem] flex justify-between ">
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
          <ul className="flex items-center justify-between ml-4 xl:ml-8 w-full mr-auto">
            <li className="p-3 xl:p-6">
              <div className="flex items-center">
                <input
                  className="w-[40rem] h-[3rem] ml-[3rem] text-black  text-[1.2rem] pl-[1rem] border-2 border-black rounded-tl-lg rounded-bl-lg flex items-center bg-white"
                  placeholder="Search Furniture"
                  onChange={handleChange}
                  onKeyDown={(event) => handleKey(event)}
                />
                <button
                  onClick={() => Search(search)}
                  className="bg-black h-[3rem] w-[5rem] flex items-center border-black border-2 rounded-tr-lg rounded-br-lg justify-center"
                >
                  <IoSearch size={30} fill="white" />
                </button>
              </div>
            </li>
            <li className="p-3 xl:p-6 mr-10">
              <button
                onClick={goToCart}
                className="bg-black gap-2 text-lg hover:bg-gray-700 text-white font-bold px-6 xl:px-8 py-2 xl:py-3 rounded flex justify-center items-center"
              >
                Cart
                <IoCartOutline size={25} />
              </button>
            </li>
          </ul>
        </nav>

        <div className="border  items-center px-4 lg:px-6 hidden md:flex xl:px-8 gap-6">
          {loggedIn ? (
            Photo(username, dropdown, setDropdown)
          ) : (
            <>
              <button
                className="bg-black text-lg hover:bg-gray-700 text-white font-bold px-6 xl:px-8 py-2 xl:py-3 rounded"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-black text-lg hover:bg-gray-700 text-white font-bold px-4 xl:px-6 py-2 xl:py-3 rounded"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
