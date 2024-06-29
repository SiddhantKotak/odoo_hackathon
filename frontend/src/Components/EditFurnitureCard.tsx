import React, { useState } from "react";
import Card from "./Card";
import { boolean } from "zod";
import TagCard from "./TagCard";

const EditFurnitureCard = () => {
  return (
    <div className="sm:w-10/12 w-full flex flex-wrap justify-center gap-5 mb-4">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default EditFurnitureCard;
