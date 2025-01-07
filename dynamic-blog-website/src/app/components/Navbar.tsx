"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";

type MenuItem = {
    title : string;
    route : string;
    children? : MenuItem[];
}

export const menu : MenuItem[] = [
    {
        title : "Home",
        route : "/"
    },
    {
        title : "Programming",
        route : "/programming"
    },
    {
        title : "Mental Health",
        route : "/mentalhealth"
    },
]

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <div>
                <div className="shadow-md w-full top-0 left-0 z-50">
                    <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">

                        <div>
                            <Link href="/" className="cursor-pointer">
                                <span className="font-bold text-violet-600 text-2xl uppercase">My Blog</span>
                            </Link>
                        </div>

                        <div onClick = {() => setIsOpen(!isOpen)}
                            className="absolute right-8 top-6 cursor-pointer w-7 h-7 z-50 lg:hidden">
                            {isOpen ? <HiXMark/> : <HiBars3BottomRight/>}
                        </div>

                        <div className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static
                         bg-white md:z-auto z-50 left-0 w-full md:w-auto md:pl-0 pl-9 pt-8
                            transition-all duration-500 ease-in ${isOpen ? "top-18" : "top-[-490px]"}`}>

                            {menu.map((item, index) => {
                                return(
                                    <Link className="md:ml-8 md:my-0 my-7 font-medium text-xl uppercase
                                     hover:text-violet-600 transition ease-in-out delay-150
                                     hover:-translate-y-1 hover:scale-300 duration-100 flex items-center"
                                        href={item.route || ""}
                                        key={`link-${index}`}
                                        onClick={handleLinkClick}
                                        >
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
