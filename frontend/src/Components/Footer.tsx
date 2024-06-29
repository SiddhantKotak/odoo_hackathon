import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-20 h-[40rem] border-t-red-600 border-4 flex items-center justify-center text-lg bg-black">
      <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
        <div className="flex justify-between w-full">
          <div className="w-full text-7xl font-bold">
            <h1 className="w-full md:w-2/3">
              How can we help you. get in touch
            </h1>
          </div>
          <div className="flex mt-8 flex-row md:justify-between">
            <div className="w-44 pt-6 md:pt-0">
              <button className="bg-red-500 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center">
                Contact US
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 flex-row justify-between">
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              About
            </a>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              Services
            </a>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              Why us
            </a>
            <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">
              Contact
            </a>
          </div>
          <hr className="border-gray-600" />
          <p className="w-full text-center mt-12 text-gray-600">
            Copyright © 2020 DallaSphere Creative
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
