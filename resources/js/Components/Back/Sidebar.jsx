import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { GoThreeBars } from "react-icons/go";
import { FaTimes, FaCogs } from "react-icons/fa";
import NotificationDropdown from "./Dropdown/NotificationDropdown";
import UserDropdown from "./Dropdown/UserDropdown.jsx";
import { FiUsers } from 'react-icons/fi';
import {
  MdOutlineDashboard,
  MdOutlineSettings,
} from 'react-icons/md';
import {
  BsChevronDown,
} from 'react-icons/bs';

const menus = [
  { title: 'Dashboard', url: '/admin/dashboard', route: 'admin.dashboard', icon: <MdOutlineDashboard /> },
  // { title: 'Inbox', url: 'Chat', route: null, icon: <BsChatLeftText /> },
  {
    title: 'HR',
    url: 'User',
    route: null,
    gap: true,
    subMenus: [
      {
        title: 'Employess',
        url: '/admin/employe',
        route: 'admin.employe',
      },
      {
        title: 'Leaves',
        url: '/services/services2',
        route: null,
      },
    ],
    icon: <FiUsers />
  },
  { title: 'Setting', url: '/admin/setting', route: 'admin.setting', icon: <MdOutlineSettings /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [collapseShow, setCollapseShow] = useState("hidden");

  const activeMenu = (url) => {
    return url === window.location.pathname ? "bg-blue-600 hover:text-white" : "";
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-[#171F29] flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-3">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() =>
              setCollapseShow("bg-zinc-800 m-2 py-3 px-6")
            }
          >
            <GoThreeBars className="text-white" />
          </button>
          {/* Brand */}
          <Link
            href={route("home")}
            className="md:block text-left text-white md:pb-2 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
          >
            Work From Anyway
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href={route("home")}
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  ></Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() =>
                      setCollapseShow("hidden")
                    }
                  >
                    <FaTimes color="white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Form Search */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-2 md:min-w-full" />

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {menus.map((menu, index) => (

                <React.Fragment key={index}>
                  <li
                    className={`flex rounded-md p-2 cursor-pointer hover:text-blue-600 text-white text-sm items-center gap-x-4 
                    ${menu.gap ? 'mt-9' : 'mt-2'}  
                    ${activeMenu(menu.url)}
                    `}
                  >
                    {menu.icon ? menu.icon : <MdOutlineDashboard />}
                    <Link href={menu.route ? route(menu.route) : ""} className="flex-1">{menu.title}</Link>
                    {menu.subMenus && (
                      <BsChevronDown
                      size={16}
                        onClick={() => setSubMenuOpen(!subMenuOpen)}
                        className={`${subMenuOpen && 'rotate-180'}`}
                      />
                    )}
                  </li>
                  {menu.subMenus && subMenuOpen && open && (
                    <ul>
                      {menu.subMenus.map((subMenuItem, idx) => (
                        <React.Fragment key={idx}>
                        <li
                        
                          className={`hover:text-blue-600 rounded-md flex px-9 cursor-pointer text-center text-sm text-gray-200 py-2 ${activeMenu(subMenuItem.url)}`}
                        >

                          <Link
                            href={subMenuItem.route ? route(subMenuItem.route) : ""}
                          >{subMenuItem.title}
                          </Link>

                        </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;