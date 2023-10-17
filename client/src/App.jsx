import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";
import Logout from "./components/Logout";
import Updatepassword from "./components/updatepassword";

const App = () => {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/update-password" element={<Updatepassword/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;