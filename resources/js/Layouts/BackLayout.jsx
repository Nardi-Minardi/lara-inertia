import React from "react";
import { Link, Head } from "@inertiajs/react";
import Sidebar from "@/Components/Back/Sidebar";
import Navbar from "@/Components/Back/Navbar";

const BackLayout = ({ children, title, menus }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <Navbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
};

export default BackLayout;
