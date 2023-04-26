import { BsArrowRight } from "react-icons/bs";
import { Link } from "@inertiajs/react";

const AuthItem = ({ user }) => {
  return (
    <div className="relative">
      <div className="hidden lg:flex flex-row items-center gap-4">
        {user ? (
          <Link
            href={route("admin.dashboard")}
            className="color__primary__main 
          bg__primary__surface 
          py-2 
          px-5 
          rounded-md 
          text-sm 
          font-medium 
          hover:bg-blue-600 
          hover:text-white 
          transition
          "
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href={route("login")}
              className="color__primary__main 
          bg__primary__surface 
          py-2 
          px-5 
          rounded-md 
          text-sm 
          font-medium 
          hover:bg-blue-600 
          hover:text-white 
          transition
          "
            >
              Login
            </Link>
            <Link
              href={route("register")}
              className="inline-flex
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
          transition"
            >
              Register
              <BsArrowRight size={18} className="ml-2" />
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default AuthItem;
