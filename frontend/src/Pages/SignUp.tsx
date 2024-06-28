import React from "react";
import SignUpInput from "../Components/SignUpInput";
import Quote from "../Components/Quote";

const SignUp = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <SignUpInput />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
