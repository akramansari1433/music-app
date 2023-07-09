"use client";
import Song from "@/components/Song";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SavedSongs() {
    const { activeSong } = useSelector((state: RootState) => state.songs);
    const [savedSongs, setSavedSongs] = useState<Song[]>([]);
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedSongsData = JSON.parse(
                localStorage.getItem("savedSongs") || "[]"
            );
            setSavedSongs(savedSongsData);
        }
    }, []);

    return (
        <main
            className={`lg:ml-[19.75rem] mx-3 my-1 fixed top-20 ${
                activeSong ? "bottom-24" : "bottom-3 z-10"
            } transition-all duration-300 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg p-2 md:p-5`}
        >
            <div>
                <div className="flex flex-col">
                    {savedSongs.map((song, idx) => (
                        <Song key={idx} {...song} />
                    ))}
                </div>
            </div>
        </main>
    );
}
