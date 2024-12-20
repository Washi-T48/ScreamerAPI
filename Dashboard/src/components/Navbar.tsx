"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <nav className="bg-gray-100 dark:bg-gray-900 p-4 flex justify-between items-center shadow-md transition-colors duration-300">
            <div className="flex items-center space-x-6 ml-12">
                <Link href="/">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Screamy
                    </h1>
                </Link>
            </div>
            <div className="flex gap-6">
                <Link href="/device">
                    <button className=" font-bold dark:text-white px-4 py-2 rounded-md ">
                        Device
                    </button>
                </Link>
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                    {darkMode ? (
                        <FaSun className="h-6 w-6 text-yellow-500" />
                    ) : (
                        <FaMoon className="h-6 w-6 text-gray-900 dark:text-gray-300" />
                    )}
                </button>
            </div>
        </nav>
    );
}
