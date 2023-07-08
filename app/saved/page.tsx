"use client";
import Card from "@/components/Song";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export default function SavedSongs() {
    const { activeSong } = useSelector((state: RootState) => state.songs);
    if (typeof window !== "undefined") {
        const savedSongs: Song[] = JSON.parse(
            localStorage.getItem("savedSongs") || "[]"
        );
        return (
            <main
                className={`lg:ml-[19.75rem] mx-3 my-1 fixed top-20 ${
                    activeSong ? "bottom-24" : "bottom-3 z-10"
                } transition-all duration-300 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg p-2 md:p-5`}
            >
                <div>
                    <div className="flex flex-col">
                        {savedSongs.map((song, idx) => (
                            <Card key={idx} {...song} />
                        ))}
                    </div>
                </div>
            </main>
        );
    }
    return null;
}
