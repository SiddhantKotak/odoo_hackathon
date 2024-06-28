import React, { useContext, useState } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AskPassword: React.FC = () => {
  const navigate = useNavigate();
  const { setLoggedIn, setUsername } = useContext(AppContext) as Context;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  // Setting up the user in the backend
  async function sendRequest(password: string) {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/update`,
        { password: password },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = res.data;
      if (data.status == 200) {
        setLoggedIn(true);
        setUsername(data.name);
        navigate("/");
      } else alert(data.message);
    } catch (error) {
      alert("Error while signing up");
    }
  }

  function handleSendRequest() {
    if (password === confirmPassword) {
      sendRequest(password);
    } else {
      alert("Password and Confirm Password do not match");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-200">
      <div className="mx-auto bg-gray-800 text-white p-20 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Set Your Password
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-left font-medium mb-1"
            >
              Enter your password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-left font-medium mb-1"
            >
              Confirm your password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleSendRequest}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskPassword;
