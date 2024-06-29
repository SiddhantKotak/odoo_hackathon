import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import AskPassword from "./Pages/AskPassword";
import FurnitureProfile from "./Pages/FurnitureProfile";
import Cart from "./Pages/Cart";
import AddFurniture from "./Pages/AddFurniture";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/setpassword" element={<AskPassword />} />
          <Route path="/addFurniture" element={<AddFurniture />} />
          <Route path="/furnitureProfile" element={<FurnitureProfile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      {}
    </>
  );
}

export default App;
