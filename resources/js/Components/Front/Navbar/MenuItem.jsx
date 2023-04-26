import scrollToPage from "@/Utils/scrollToPage";
import { useState } from "react";

const MenuItem = ({menus}) => {
  const [active, setActive] = useState("/home");

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-4 py-1'>
        {menus.map((menu, index) => {
          return (
            <a
              onClick={() => {
                scrollToPage(menu.url);
                setActive(menu.url);
              }}
              className={`${
                active === menu.url ? "text-blue-600" : ""
              } group hidden lg:block transition duration-300 color__neutral_100 font-medium hover:text-blue-600 cursor-pointer px-2`}
              key={index}>
              {menu.title}
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-600'></span>
            </a>
          );
        })
        }
       
      </div>
    </div>
  );
};

export default MenuItem;
