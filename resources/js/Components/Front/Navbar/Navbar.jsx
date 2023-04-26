import Container from "@/Components/Container";
import Logo from "@/Components/Logo";
import MenuItem from "./MenuItem";
import AuthItem from "./AuthItem.jsx";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import React, { useState } from "react";
import scrollToPage from "@/Utils/scrollToPage";
import { Link, useForm, usePage } from "@inertiajs/react";
import logo from "../../../../static/images/logo.png";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  const user = usePage().props.auth.user;
  const menus = usePage().props.menus;

  return (
    <div className='w-full bg-white z-10'>
      <div className='py-4 '>
        <Container>
          <div
            className='
            flex 
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          '>
            <div className='flex flex-row gap-20'>
              <img src={logo} alt='logo' className='w-12 h-10' />
              <MenuItem menus={menus} />
            </div>
            <AuthItem user={user} />

            {/* menu mobile */}
            {isToggle && (
              <div
                className={`
              lg:hidden 
              w-full
              min-h-screen
              absolute 
              z-50
              mx-auto
              top-0 
              right-0 
              mt-16
              py-6
              md:px-9
              sm:px-5
              px-4
              bg-white`}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}>
                  <div className='flex flex-col gap-4'>
                    <a
                      onClick={() => {
                        scrollToPage("#home");
                        setIsToggle(!isToggle);
                        setIsOpen(!isOpen);
                      }}
                      className='color__neutral_100 font-medium hover:text-blue-600 cursor-pointer py-2 transition'>
                      Home
                    </a>
                    <a
                      onClick={() => {
                        scrollToPage("#layanan");
                        setIsToggle(!isToggle);
                        setIsOpen(!isOpen);
                      }}
                      className='color__neutral_100 font-medium hover:text-blue-600 cursor-pointer py-2 transition'>
                      Layanan
                    </a>
                    <a
                      href='#'
                      className='color__neutral_100 font-medium hover:text-blue-600 cursor-pointer py-2 transition'>
                      Tutorial
                    </a>
                    <a
                      onClick={() => {
                        scrollToPage("#testimoni");
                        setIsToggle(!isToggle);
                        setIsOpen(!isOpen);
                      }}
                      className='color__neutral_100 font-medium hover:text-blue-600 cursor-pointer py-2 transition'>
                      Testimoni
                    </a>
                  </div>
                  <div className='mt-5 mb-5 bg-neutral-50 p-5 w-full flex-row flex gap-4 items-center justify-center'>
                    {user ? (
                      <Link
                        href={route("admin.dashboard")}
                        className='
                          color__primary__main 
                          bg__primary__surface 
                          py-2 
                          px-5 
                          rounded-md 
                          text-sm 
                          font-medium 
                          hover:bg-blue-600 
                          hover:text-white 
                          transition'>
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href={route("login")}
                          className='
                        color__primary__main 
                        bg__primary__surface 
                        py-2 
                        px-5 
                        rounded-md 
                        text-sm 
                        font-medium 
                        hover:bg-blue-600 
                        hover:text-white 
                        transition'>
                          Login
                        </Link>
                        <Link
                          href={route("register")}
                          className='
                        inline-flex
                        items-center
                        text-white
                        bg__primary__main 
                        py-2 
                        px-5 
                        rounded-md 
                        text-sm 
                        font-medium 
                        hover:bg-blue-600 
                        hover:text-white
                        transition'>
                          Register
                          <BsArrowRight size={18} className='ml-2' />
                        </Link>
                      </>
                    )}

                  </div>
                  {/* <hr></hr> */}
                </motion.div>
              </div>
            )}

            {/* hamburger menu */}
            <button
              className='flex-col lg:hidden mt-1 justify-center items-center h-8 w-8 group'
              onClick={() => {
                setIsToggle(!isToggle);
                setIsOpen(!isOpen);
              }}>
              <div
                className={`${genericHamburgerLine} ${isOpen
                  ? "rotate-45 translate-y-1 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
                  }`}
              />
              <div
                className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                  }`}
              />
              <div
                className={`${genericHamburgerLine} ${isOpen
                  ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
                  }`}
              />
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
