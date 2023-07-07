"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export default function Sidebar() {
    const { activeSong } = useSelector((state: RootState) => state.songs);
    return (
        <div
            className={`hidden lg:fixed lg:top-3 ${
                activeSong ? "lg:bottom-24" : "lg:bottom-3"
            } duration-300 transition-all lg:inset-x-3 lg:z-50 lg:flex lg:w-72 lg:flex-col`}
        >
            <div className="flex grow flex-col gap-y-5 overflow-y-auto rounded-xl bg-gray-800 px-6 py-4">
                <h1 className="text-white text-4xl font-semibold">SideBar</h1>
            </div>
        </div>
    );
}
