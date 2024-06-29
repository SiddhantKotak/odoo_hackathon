import React, { useState } from "react";
import EditFurnitureCard from "../Components/EditFurnitureCard";
import Navbar from "../Components/Navbar";
import { MdAddBusiness } from "react-icons/md";
import TagCard from "../Components/TagCard";
import image from "../assets/chair.jpg";
import { useNavigate } from "react-router-dom";

const AddFurniture = () => {
  const [showChildCards, setshowChildCards] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-x-hidden relative min-h-screen bg-slate-600">
      <Navbar />
      <button
        className="flex justify-center items-center top-28 left-5 bg-red-700 bg-opacity-70 text-white py-2 px-4 rounded z-50 shadow-lg fixed"
        onClick={() => {
          navigate("/furnitureProfile");
        }}
      >
        <MdAddBusiness className="mr-2" /> Add Your Furniture
      </button>

      {showChildCards ? (
        <div>
          <button
            className="flex justify-center items-center top-28 right-5 bg-red-700 bg-opacity-70 text-white py-2 px-4 rounded z-50 shadow-lg fixed"
            onClick={() => setshowChildCards(false)}
          >
            <MdAddBusiness className="mr-2" /> Go Back To Tags
          </button>
        </div>
      ) : null}

      <div className="flex flex-col justify-center items-center mt-[5rem] w-full">
        <div className="w-full flex flex-wrap justify-center gap-5 mb-4">
          <div className=" min-h-screen flex justify-center items-center w-full">
            {showChildCards ? (
              <EditFurnitureCard />
            ) : (
              <div className="h-full w-full flex justify-center items-center flex-wrap gap-4">
                <TagCard
                  tagName={"Chair"}
                  picture={image}
                  setshowChildCards={setshowChildCards}
                />
                <TagCard
                  tagName={"Table"}
                  picture={image}
                  setshowChildCards={setshowChildCards}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFurniture;
