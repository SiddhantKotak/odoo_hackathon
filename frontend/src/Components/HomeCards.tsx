import React from "react";
import CardHome from "./CardHome";

const HomeCards = () => {
  const data = [
    [1, 2, 3, 10],
    [4, 5, 6, 11],
    [7, 8, 9, 12],
  ];
  return (
    <div className="mb-10">
      <div className="bg-white pb-[4rem] ">
        <div className="text-[3rem] text-indigo-500 ml-[1.5rem] font-semibold bg-white pl-[7.6rem] pt-[6rem] flex">
          Renting options
        </div>
        <div className="ml-[9rem] w-[80rem] mt-[0.6rem]  h-1 bg-blue-700 border-2 border-blue-700"></div>
      </div>
      <div className="flex justify-center items-center flex-col font-sans bg-white  gap-y-14">
        {/* {data.map((items, index) => (
          <CardHome key={index}></CardHome>
        ))} */}
        {data.map((items, index) => {
          return (
            <div
              key={index}
              className=" w-[92rem] flex gap-x-10 justify-center"
            >
              {items.map((item, index) => (
                <CardHome key={index} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCards;
