import React from "react";
import { createPopper } from "@popperjs/core";
import avatar from "../../../../static/images/avatar.jpg";
import {
  MdOutlineDashboard,
  MdOutlineSettings,
  MdAccountCircle,
  MdLogout,
} from 'react-icons/md';
import { Link } from '@inertiajs/react'

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow
            ? closeDropdownPopover()
            : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={avatar}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={`
                    ${dropdownPopoverShow ? "block bg-white" : "hidden "}
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                `}
      >
        <div className="flex flex-row items-center px-4 ">
          <MdAccountCircle size={24} />
          <Link
            href={route('profile')}
            className={
              "text-sm py-2 ml-3 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            Profile
          </Link>
        </div>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <div className="flex flex-row items-center px-4">
          <MdLogout size={24}/>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className={
              "text-sm py-2 ml-3 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 focus:outline-none"
            }

          >
            Logout
          </Link>
        </div>

      </div>
    </>
  );
};

export default UserDropdown;
