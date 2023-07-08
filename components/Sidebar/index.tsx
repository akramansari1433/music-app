"use client";
import { RootState } from "@/store/store";
import { HomeIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
    const { activeSong } = useSelector((state: RootState) => state.songs);
    const { status } = useSession();

    if (status === "unauthenticated" || status === "loading") {
        return null;
    }

    return (
        <div
            className={`hidden lg:fixed lg:top-3 ${
                activeSong ? "lg:bottom-24" : "lg:bottom-3"
            } duration-300 transition-all lg:inset-x-3 lg:z-50 lg:flex lg:w-72 lg:flex-col`}
        >
            <div className="flex flex-col grow gap-y-5 overflow-y-auto rounded-xl bg-gray-800 p-3">
                <div className="h-80 flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-500 rounded-xl">
                    <h1 className="text-white text-4xl font-bold font-mono">
                        Music App
                    </h1>
                </div>
                <div className="flex flex-col gap-y-3 py-3">
                    <Link
                        className="text-white flex flex-row items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-700"
                        href="/"
                    >
                        <HomeIcon className="h-6 w-6" />
                        <span className="text-xl">Home</span>
                    </Link>
                    <Link
                        className="text-white flex flex-row items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-700"
                        href="/saved"
                    >
                        <HeartIcon className="h-6 w-6" />
                        <span className="text-xl">Saved</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
