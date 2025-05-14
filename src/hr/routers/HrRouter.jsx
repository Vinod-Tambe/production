import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import ThemeSetting from "../components/setting/ThemeSetting";
import Notification from "../components/header/Notification";
function HrRouter() {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <ThemeSetting />
      <Notification />
      <Routes>
        <Route path="/*" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default HrRouter;
