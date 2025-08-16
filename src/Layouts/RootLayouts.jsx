import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/SharedComponents/NavBar";
import Footer from "../components/SharedComponents/Footer";

const RootLayouts = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayouts;
