import React from "react";
import LogInInput from "../Components/LogInInput";
import Quote from "../Components/Quote";

const LogIn = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <LogInInput />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
