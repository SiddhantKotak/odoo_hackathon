import axios from "axios";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton";

const LogInInput = () => {
  const { setLoggedIn, setUsername } = useContext(AppContext) as Context;
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      setPostInputs({
        email: "",
        password: "",
      });
      const data = res.data;
      if (data.status == 200) {
        console.log(res.data);
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setUsername(data.name);
        navigate("/");
      } else alert(data.message);
    } catch (e) {
      alert("Error while login in");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold mb-4">
              LogIn to DallaSphere
            </div>
            <div className="text-slate-500 ml-6">
              Don't have an account?
              <Link className="pl-2 underline text-blue-600" to="/signup">
                SignUp
              </Link>
            </div>
          </div>
          <div className="pt-8">
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
              Log In
            </button>
            <div className="mt-1 w-full text-gray-500 flex justify-center items-center bg-white  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 text-lg">
              ------- OR --------
            </div>
            <GoogleButton type="Login" />
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

export default LogInInput;
