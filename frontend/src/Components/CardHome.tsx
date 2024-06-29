import React from "react";
import image from "../assets/hero.png";

const CardHome = () => {
  const description: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias iste sapiente, eum voluptatibus corporis unde? Quos illo dolorum deserunt rem totam fuga nihil ipsa. Dolor, quibusdam eaque? Ipsa, saepe possimus?";

  return (
    <div className="w-[30%] h-[55%] bg-black rounded-md overflow-hidden relative mt-4 hover:scale-105 transition duration-300 ease-in hover:cursor-pointer">
      <div className="h-50% m-2">
        <img className=" w-full" src={image}></img>
      </div>
      <div className=" p-2">
        <p className=" text-white font-semibold text-2xl leading-6">Chair</p>{" "}
        <p className=" mt-2 text-white">
          {description.length > 100
            ? description.substr(0, 100) + "..."
            : description}
        </p>
        <p className=" mt-2 text-white">
          <span className=" text-slate-400">Address: </span>Odoo hackathon,
          gandhinagar, Ahmedabad
        </p>
      </div>
    </div>
  );
};

export default CardHome;
