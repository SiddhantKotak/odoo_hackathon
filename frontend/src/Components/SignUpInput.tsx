import axios from "axios";
import React from "react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";
import GoogleButton from "./GoogleButton";

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

const SignUpInput = () => {
  const { setLoggedIn, setUsername } = useContext(AppContext) as Context;
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function sendRequest() {
    try {
      //jwt add
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      setPostInputs({ name: "", email: "", password: "" });
      const data = res.data;
      if (data.status == 200) {
        localStorage.setItem("token", data.message);
        setLoggedIn(true);
        setUsername(data.name);
        navigate("/");
      } else if (data.status == 403) {
        alert("email already exists");
      }
    } catch (error) {
      alert("Error while signing up");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold mb-4">
              Create a new account
            </div>
            <div className="text-slate-500 ml-6">
              Already have an account?
              <Link className="pl-2 underline text-blue-600" to="/login">
                LogIn
              </Link>
            </div>
          </div>
          <div className="pt-8">
            <LabelledInput
              label="Name"
              placeholder="Yash Mishra..."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="Email"
              type={"email"}
              placeholder="yash@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-10 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign Up
            </button>
            <div className="mt-1 w-full text-gray-500 flex justify-center items-center bg-white  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 text-lg">
              ------- OR --------
            </div>
            <GoogleButton type="SignUp" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-lg text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default SignUpInput;
