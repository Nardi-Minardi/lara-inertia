import React from "react";
import UserDropdown from "./Dropdown/UserDropdown.jsx";
import NotificationDropdown from "./Dropdown/NotificationDropdown";
import { InputText } from 'primereact/inputtext';
import { BiSearch } from 'react-icons/bi';

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white lg:py-1 md:py-1 shadow-md w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-4 px-4">
          {/* Brand */}
          <a
            className="text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard HEader
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
            <span className="p-input-icon-left">
        <BiSearch />
        <InputText type="search" className='h-8' onInput={(e) => {} } placeholder="Search..." />
      </span>
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul> */}
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
