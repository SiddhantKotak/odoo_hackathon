import React, { useContext } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import "../styles.css";
import { AppContext, Context } from "../Context/UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const username: string = "yash21234";
const house_no: string = "C-1102";
const street: string = "Ujala Circle";
const area: string = "Sarkhej Circle";
const city_state: string = "Ahmedabad,Guajarat";
const phone_num: string = "9898134321";

const EditProfile = () => {
  const navigate = useNavigate();
  const { profile, setProfile, logUser } = useContext(AppContext) as Context;
  const name: string = logUser.name;
  const email: string = logUser.email;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function sendRequest() {
    console.log(profile);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/profile/add`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log("res data" + res.data);
    } catch (e) {
      alert("Error while login in");
    }
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    console.log(profile);
    e.preventDefault();
    sendRequest();
  }

  return (
    <form
      className="flex flex-col justify-center items-center w-[100%] font-serif tracking-widest"
      onSubmit={(e) => submitHandler(e)}
    >
      <p className="font-bold text-[2rem]">{`Edit Profile`} </p>
      <div className="w-[50%] px-10 pb-[2rem]" id="outer">
        <div>
          <p className="text-[1.2rem] font-semibold">FILL YOUR DETAILS</p>
          <div className="flex flex-col  pb-[2rem]" id="br">
            <p className="text-[1.1rem] ">Name:</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem] "
              placeholder={name}
              disabled
            ></input>
          </div>

          <div className="flex flex-col ] pb-[2rem]" id="br">
            <p className="text-[1.1rem]">Username :</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem] "
              placeholder={username}
              onChange={(e) => {
                setProfile({ ...profile, username: e.target.value });
              }}
            ></input>
          </div>

          <div className="flex flex-col  pb-[1rem]" id="br">
            <p className="text-[1.1rem]">Email:</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]  "
              value={email}
              disabled
            ></input>
          </div>

          <div className="flex flex-col  pb-[2rem]" id="br">
            <p className="text-[1.1rem]">Phone Number :</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]  "
              placeholder={phone_num}
              onChange={(e) => {
                setProfile({ ...profile, phone_num: e.target.value });
              }}
            ></input>
          </div>

          <div className="flex flex-col  pb-[2rem]" id="br">
            <p className="text-[1.1rem]">House No:</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              placeholder={house_no}
              onChange={(e) => {
                setProfile({ ...profile, house_no: e.target.value });
              }}
            ></input>
          </div>

          <div className="flex flex-col  pb-[2rem]" id="br">
            <p className="text-[1.1rem]">Street name:</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              placeholder={street}
              onChange={(e) => {
                setProfile({ ...profile, street: e.target.value });
              }}
            ></input>
          </div>

          <div className="flex flex-col  pb-[2rem]" id="br">
            <p className="text-[1.1rem]">Area:</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              placeholder={area}
              onChange={(e) => {
                setProfile({ ...profile, area: e.target.value });
              }}
            ></input>
          </div>

          <div className="flex flex-col pb-[2rem]" id="br">
            <p className="text-[1.1rem]">City , State :</p>
            <input
              type="text"
              className="border-dimgray-400 border-[2px] w-[70%]  h-[3.4rem]"
              placeholder={city_state}
              onChange={(e) => {
                setProfile({ ...profile, city_state: e.target.value });
              }}
            ></input>
          </div>

          <div className="flex flex-col  pb-4 " id="br">
            <p className="text-[1.1rem]">Upload a Photo of QR Code :</p>
            <div
              className="w-[5rem] h-[5rem] border-red-500 border flex justify-center items-center mt-[10rem]"
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
            >
              EDIT PROFILE
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
