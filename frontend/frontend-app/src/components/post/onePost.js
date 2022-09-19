
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/home";
import Profil from "../../pages/profil";
import LogPage from "../../pages/log-page";
import Navbar from "../navbar";

const index = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        {" "}
        <Route path="/" element={<LogPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<LogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
