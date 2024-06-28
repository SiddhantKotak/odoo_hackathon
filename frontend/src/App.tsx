import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import React from "react";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import AskPassword from "./Pages/AskPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/setpassword" element={<AskPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
