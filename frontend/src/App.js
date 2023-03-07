import React, { useState, useEffect, useRef } from "react";
import "./assets/css/style.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="*" element={<Notepage />} ></Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
