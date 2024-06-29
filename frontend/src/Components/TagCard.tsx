import React from "react";

interface tagCard {
  tagName: string;
  picture: string;
  setshowChildCards: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagCard: React.FC<tagCard> = ({
  tagName,
  picture,
  setshowChildCards,
}) => {
  return (
    <div
      className="relative w-[30%] h-[50%] bg-cover bg-center rounded-md overflow-hidden mt-4 flex justify-center items-center hover:cursor-pointer"
      style={{ backgroundImage: `url(${picture})` }}
      onClick={() => setshowChildCards(true)}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h1 className="relative text-white text-4xl font-bold leading-tight text-center z-10">
        {tagName}
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 blur-lg opacity-75 animate-pulse"></span>
      </h1>
    </div>
  );
};

export default TagCard;
