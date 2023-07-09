"use client";
import Song from "@/components/Song";
import { getSavedSongs } from "@/slices/songsSlice";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SavedSongs() {
    const { activeSong, savedSongs } = useSelector((state: RootState) => state.songs);
    const dispatch = useDispatch();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });

    useEffect(() => {
        dispatch(getSavedSongs());
    }, [dispatch]);

    return (
        <main
            className={`lg:ml-[19.75rem] mx-3 my-1 fixed top-20 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg p-2 md:p-5 
            ${activeSong ? "bottom-24" : "bottom-3"} 
            ${status === "loading" ? "opacity-0" : ""} transition-all duration-300`}
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
