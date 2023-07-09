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

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <div
            className={`hidden lg:fixed lg:top-3 ${activeSong ? "lg:bottom-24" : "lg:bottom-3"}
            ${status === "loading" ? "opacity-0" : ""}
            transition-all duration-300 lg:inset-x-3 lg:z-50 lg:flex lg:w-72 lg:flex-col`}
        >
            <div className="flex grow flex-col gap-y-5 overflow-y-auto rounded-xl bg-gray-800 p-3">
                <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-red-500">
                    <h1 className="line-clamp-1 text-4xl font-bold text-white">Music App</h1>
                </div>
                <div className="flex flex-col gap-y-3 py-3">
                    <Link
                        className="flex flex-row items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-gray-700"
                        href="/"
                    >
                        <HomeIcon className="h-6 w-6" />
                        <span className="text-xl">Home</span>
                    </Link>
                    <Link
                        className="flex flex-row items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-gray-700"
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
