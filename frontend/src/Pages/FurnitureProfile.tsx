import React from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import "../styles.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

interface Props {
  option: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  address?: string;
}

let props: Props = {
  option: "Edit",
  name: "Sofa Cum Bed",
  description: "Can Easily ACCOMODATE 5V PEOPLE",
  price: 25,
};

function submitHandler(e: { preventDefault: () => void }) {
  e.preventDefault();
}

const FurnitureProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-x-hidden relative min-h-screen">
      <Navbar />
      <form
        className="flex flex-col justify-center items-center w-[100%] font-serif tracking-widest mt-[5rem]"
        onSubmit={submitHandler}
      >
        <p className="font-bold text-[2rem]">{`${props.option} Furniture`} </p>
        <div className="w-[50%] px-10" id="outer">
          <div>
            <p className="text-[1.2rem] font-semibold mt-4 mb-2">
              INCLUDE SOME DETALS
            </p>
            <div className="flex flex-col space-[-1rem] " id="br">
              <p className="text-[1.1rem]">Furniture Title:</p>
              <input
                type="text"
                className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              ></input>
              <p className="py-[1.2rem]   text-[#6a6a6a]">
                Mention the key features of your item(eg:brand , model name)
              </p>
            </div>

            <div className="flex flex-col space-[-1rem]" id="br">
              <p className="text-[1.1rem]">Description:</p>

              <textarea className="border-dimgray-400 border-[2px] w-[70%] h-[5.3rem]"></textarea>
              <p className="py-[1.2rem]  text-[#6a6a6a]  ">
                Include condition, features and reason for selling
              </p>
            </div>

            <div className="flex flex-col space-[-1rem]" id="br">
              <p className="text-[1.1rem]">Set a Price :</p>
              <input
                type="text"
                className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              ></input>
              <p className="py-[1.2rem]  text-[#6a6a6a]">
                Enter the price at which you wish to rent out
              </p>
            </div>

            <div className="flex flex-col space-[-1rem]" id="br">
              <p className="text-[1.1rem]">Select Type of Furniture :</p>
              <input
                type="text"
                className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              ></input>
              <p className="py-[1.2rem]  text-[#6a6a6a]">
                Enter the price at which you wish to rent out
              </p>
            </div>

            <div className="flex flex-col space-[-1rem]" id="br">
              <p className="text-[1.1rem]">Quantity:</p>
              <input
                type="text"
                className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              ></input>
              <p className="py-[1.2rem]  text-[#6a6a6a]">
                Enter the quantity of the product
              </p>
            </div>

            <div className="flex flex-col space-[-1rem]" id="br">
              <p className="text-[1.1rem]">Address :</p>
              <input
                type="text"
                className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              ></input>
              <p className="py-[1.2rem]   text-[#6a6a6a]">
                The Address at which the furniture will be available
              </p>
            </div>

            <div className="flex flex-col space-[-1rem] pb-4" id="br">
              <p className="text-[1.1rem]">Upload a Photo :</p>
              <div
                className="w-[5rem] h-[5rem] border-red-500 border flex justify-center items-center mt-[2rem]"
                id="border"
              >
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white border-black border-2 "
                  htmlFor="img-upload"
                >
                  <MdOutlineAddAPhoto
                    fill="black"
                    className="py-[0.6rem]"
                    size={44}
                  />
                </label>
                <input
                  type="file"
                  className="border-dimgray-400 border-[2px] w-[90%]  h-[2.9rem] focus:border-green-500 focus:border-2 hidden "
                  id="img-upload"
                ></input>
              </div>
            </div>

            <div className="flex flex-col h-[8rem] justify-center" id="br">
              <button
                className="w-[12rem] h-[3rem] font-semibold text-[1rem] bg-blue-500 hover:cursor-pointer hover:bg-blue-600 "
                type="submit"
                value="submit"
                onClick={() => {
                  navigate("/addFurniture");
                }}
              >
                POST NOW
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FurnitureProfile;
