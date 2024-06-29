import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import AskPassword from "./Pages/AskPassword";
import FurnitureProfile from "./Pages/FurnitureProfile";
import Cart from "./Pages/Cart";
import AddFurniture from "./Pages/AddFurniture";
import UserInfo from "./Pages/UserInfo";
import EditProfile from "./Pages/EditProfile";

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
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
      {}
    </>
  );
}

export default App;
