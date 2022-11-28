import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Signup from "./pages/Signup";
import io from "socket.io-client";
const socket = io.connect("http://localhost:9000");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/" element={<Chat socket={socket} />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
