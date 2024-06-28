import {
  useGoogleLogin,
  TokenResponse,
  googleLogout,
} from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/UseContext";
import { Context } from "../Context/UseContext";
import { SingupInput } from "../zod-types";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

type User = Omit<TokenResponse, "error" | "error_description" | "error_uri">;

const GoogleButton = ({ type }: { type: "SignUp" | "Login" }) => {
  const { setLoggedIn, setUsername } = useContext(AppContext) as Context;
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState<User | undefined>(undefined);

  //setting up the user in the backend
  async function sendRequest(signup: SingupInput) {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signup);
      const data = res.data;
      if (data.status == 200) {
        googleLogout();
        localStorage.setItem("token", data.message);
        setUsername(data.name);
        navigate("/setpassword");
      } else if (data.status == 403) {
        setLoggedIn(true);
        googleLogout();
        localStorage.setItem("token", data.message);
        setUsername(data.name);
        navigate("/");
      }
    } catch (error) {
      alert("Error while signing up");
    }
  }

  async function sendLoginRequest(email: string) {
    const body = {
      email: email,
    };
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signingoogle`,
        body
      );
      const data = res.data;
      if (data.status == 200) {
        googleLogout();
        setLoggedIn(true);
        localStorage.setItem("token", data.message);
        navigate("/");
      } else alert(data.message);
    } catch (e) {
      alert("Error while login in");
    }
  }

  //getting the main object after the user is logged in
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { error, error_description, error_uri, ...userWithoutErrors } =
        tokenResponse;
      setUser(userWithoutErrors as User);
      console.log(userWithoutErrors);
    },
    onError: (error) => console.log("Login failed: ", error),
  });

  //getting the creditials of the loggined user
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (type === "SignUp") {
            const signup: SingupInput = {
              name: res.data.name,
              email: res.data.email,
              password: res.data.id,
            };
            sendRequest(signup);
          } else sendLoginRequest(res.data.email);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <button
      onClick={() => login()}
      className="mt-1 w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      <div className="flex gap-4 justify-center items-center">
        <FcGoogle size={22}></FcGoogle>
        <span className="text-white">{type} with Google</span>
      </div>
    </button>
  );
};

export default GoogleButton;
