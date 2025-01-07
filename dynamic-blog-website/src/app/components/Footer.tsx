"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Copyright from "./Copyright";

const Footer = () => {
    return (
        <div>
            <div className="pt-16 px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen md:px-24 lg:px-8">
                <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4 font-serif">
                    <div className="sm:col-span-2">
                        <Link href="/" aria-label="Go Home" title="ubcodes" className="">
                            <span className="ml-2 text-violet-600 text-2xl uppercase font-bold tracking-wide">
                                My Blog
                            </span>

                        </Link>
                        <div className="mt-6 lg:max-w-sm">
                            <p className="text-sm text-gray-800">Everything related to programming</p>
                            <p className="mt-4 text-sm text-gray-800">Mental Health and Books</p>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p className="text-base font-bold tracking-wide text-gray-900">Contacts</p>
                        <div className="flex">
                            <p>Phone:</p>
                            <Link className="transition-colors duration-300 text-secondary hover:text-violet-400"
                                href="+234 567 890"
                                aria-label="My Phone Number"
                                title="My Phone Number"
                            >+234 567 890</Link><br />
                        </div>

                        <div className="flex">
                            <p>Email:</p>
                            <Link className="transition-colors duration-300 text-secondary hover:text-violet-400"
                                href="mailto:faizakanwal5050@gmail.com"
                                aria-label="My Email"
                                title="My Email"
                            >faizakanwal5050@gmail.com</Link>
                        </div>

                    </div>

                    <p>
                        <span className="text-violet-500"> Developer</span> |
                        <span className="text-violet-500"> Designer</span> |
                        <span className="text-violet-500"> Writer</span> |
                    </p>
                </div>

                <div className="flex flex-col-reverse justify-between px-5 pt-5 pb-10 border-t lg:flex-row">
                    <div className="text-sm text-gray-600">
                        <Copyright blog="my blog"/>
                    </div>
                    <div className="mb-9 flex justify-center">
                        <div>
                            {" "}
                            <div className="mb-12 flex justify-center">
                                <Link href="https://www.linkedin.com/in/faiza-kanwal-04a65b2b3/" 
                                    className="icons mx-0.5 lg:mx-5 sm:mx-5 text-neutral-800
                                   dark:text-neutral-200 bg-gradient-to-r from-indigo-500
                                   via-purple-500 to-pink-500 rounded-full p-3 transition
                                    duration-300 hover:-translate-y-1">
                                
                                    <Image src="/linkedin.png" alt="image"
                                        width={4}
                                        height={4}
                                        className="bi bi-linkedin h-6 w-6"
                                    />
                                    {" "}
                                </Link>

                                <Link href="https://www.faiza_kanwal50@ymail.com" 
                                    className="icons mx-0.5 lg:mx-5 sm:mx-5 text-neutral-800
                                   dark:text-neutral-200 bg-gradient-to-r from-indigo-500
                                   via-purple-500 to-pink-500 rounded-full p-3 transition
                                    duration-300 hover:-translate-y-1">
                                
                                    <Image src="/instagram.png" alt="image"
                                        width={4}
                                        height={4}
                                        className="bi bi-instagram h-6 w-6"
                                    />
                                    {" "}
                                </Link>

                                <Link href="https://www.facebook.com/faiza.kanwal.52459?mibextid=ZbWKwL" 
                                    className="icons mx-0.5 lg:mx-5 sm:mx-5 text-neutral-800
                                   dark:text-neutral-200 bg-gradient-to-r from-indigo-500
                                   via-purple-500 to-pink-500 rounded-full p-3 transition
                                    duration-300 hover:-translate-y-1">
                                
                                    <Image src="/facebook.png" alt="image"
                                        width={4}
                                        height={4}
                                        className="bi bi-facebook h-6 w-6"
                                    />
                                    {" "}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </div>
        </div>
    )
}

export default Footer;
