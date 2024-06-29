import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { RiArmchairFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import "./styles.css";
import { AppContext, Context } from "../Context/UseContext";

// interface Props {
//   // logo: string;
//   // userImage: string;
//   // userName: string;
// }

const DropDown = () => {
  const { username } = useContext(AppContext) as Context;

  return (
    <div className="hero">
      <nav>
        <div className="sub-menu-wrap bg-black" id="subMenu">
          <div className="sub-menu space-y-3">
            <div className="user-info">
              {/* src = userImage */}
              <div className="w-[3.5rem] h-[3.5rem] rounded-full flex justify-center text-2xl items-center bg-black text-white border border-white">
                {username[0].toUpperCase()}
              </div>
              {/* userName */}
              <p className="text-white text-[1.5rem] font-semibold flex flex-wrap">
                {username}
              </p>
            </div>
            <hr />

            <a
              href="#"
              className="sub-menu-link no-underline flex items-center justify-start space-x-3  text-white text-[1rem]"
            >
              <CgProfile size={30} />
              <p>My Profile</p>
              <span>{">"}</span>
            </a>
            <a
              href="#"
              className="sub-menu-link no-underline flex items-center justify-start space-x-3  text-white text-[1rem]"
            >
              <FaUserEdit size={30} />
              <p>Edit Profile</p>
              <span>{">"}</span>
            </a>
            <a
              href="#"
              className="sub-menu-link no-underline flex items-center justify-start space-x-3  text-white text-[1rem]"
            >
              <RiArmchairFill size={30} />
              <p>Rent Your Furniture</p>
              <span>{">"}</span>
            </a>
            <a
              href="#"
              className="sub-menu-link no-underline flex items-center justify-start space-x-3  text-white text-[1rem]"
            >
              <CgNotes size={30} />
              <p>My Orders</p>
              <span>{">"}</span>
            </a>

            <div className="w-full h-[1px] bg-[#c0c0c0]"></div>

            <a
              href="#"
              className="sub-menu-link no-underline flex items-center justify-start space-x-3  text-white text-[1rem]"
            >
              <MdLogout size={30} />
              <p className="text-red-600">Logout</p>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DropDown;
