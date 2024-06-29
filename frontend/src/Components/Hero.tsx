import React from "react";
import hero from "../assets/hero1.png";

const Hero = () => {
  return (
    <div className="flex flex-wrap mt-[5rem] h-[50rem]">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold mt-6">
              DallaSphere<span className="text-blue-700">.</span>
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-2 items-center h-full lg:mt-0">
            <div className="w-full mt-[-10rem]">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Find your <span className="text-blue-700">lively</span>{" "}
                furniture for your house
              </h1>
              <div className="w-20 h-2 bg-blue-700 my-4"></div>
              <p className="text-2xl mt-20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                dignissimos atque ullam natus inventore, repudiandae aliquid
                facere aspernatur, maiores, blanditiis ad? Autem maxime nulla
                non, alias odio ducimus pariatur ratione ipsa voluptate,
                voluptatum cupiditate quae dolorem tenetur? Sed aperiam itaque
                culpa voluptatibus neque, numquam, mollitia, doloremque eligendi
                assumenda obcaecati natus!
              </p>
            </div>
          </header>
        </div>
      </div>
      <img
        src={hero}
        alt="Leafs"
        className="w-full h-[20] object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
};

export default Hero;
