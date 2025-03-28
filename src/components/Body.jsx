import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Body() {
  return (
    <div>
      <NavBar />
      <Outlet/> {/*for providing space to render children routes */}
      <Footer/>
    </div>
  );
}

export default Body;
