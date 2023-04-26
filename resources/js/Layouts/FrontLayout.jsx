import React from "react";
import Navbar from "@/Components/Front/Navbar/Navbar";
import { Link, Head } from "@inertiajs/react";

const FrontLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />
            <Navbar />
            <div>
              {children}
            </div>
        </div>
    );
};

export default FrontLayout;
