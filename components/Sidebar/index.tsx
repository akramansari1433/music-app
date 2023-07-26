"use client";
import { RootState } from "@/store/store";
import { HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import React from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import Link from "../Link";

const navLinks = [
    { label: "Home", href: "/", icon: <HomeIcon className="h-6 w-6" /> },
    { label: "Saved", href: "/saved", icon: <HeartIcon className="h-6 w-6" /> },
];

export default function Sidebar() {
    const { activeSong } = useSelector((state: RootState) => state.songs);
    const { theme, setTheme } = useTheme();

    return (
        <div
            className={`hidden lg:fixed lg:top-3 ${activeSong ? "lg:bottom-24" : "lg:bottom-3"}
            transition-all duration-300 lg:inset-x-3 lg:flex lg:w-72 lg:flex-col`}
        >
            <div className="flex grow flex-col gap-y-5 overflow-y-auto rounded-xl bg-gray-300 dark:bg-gray-800 p-3 h-full">
                <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-red-500">
                    <h1 className="line-clamp-1 text-4xl font-bold text-white">Music App</h1>
                </div>
                <div className="flex flex-col gap-y-3 py-3">
                    {navLinks.map((item, idx) => (
                        <Link key={idx} activeClassName="bg-white dark:bg-gray-700" href={item.href}>
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="mt-auto flex justify-center">
                    <Button
                        id="desktop-theme-change-button"
                        accessibleLabel="Theme change button"
                        className="rounded-full border p-2"
                        onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
                        icon={theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                    />
                </div>
            </div>
        </div>
    );
}
