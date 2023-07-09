"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Song from "@/components/Song";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login");
        },
    });
    const dispatch = useDispatch<AppDispatch>();
    const { songs, loading, activeSong } = useSelector((state: RootState) => state.songs);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchSongs(offset));
    }, [dispatch, offset]);

    function onIntersection(enteries: IntersectionObserverEntry[]) {
        const firstEntry = enteries[0];
        if (firstEntry.isIntersecting) {
            setOffset((prev) => prev + 1);
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
        if (observer && containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [songs]);

    return (
        <main
            className={`lg:ml-[19.75rem] mx-3 my-1 fixed top-20 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg p-2 md:p-5 
            ${activeSong ? "bottom-24" : "bottom-3"} 
            ${status === "loading" ? "opacity-0" : ""} transition-all duration-300`}
        >
            <div>
                <div className="flex flex-col">
                    {songs.map((song, idx) => (
                        <Song key={idx} {...song} />
                    ))}
                </div>

                <div ref={containerRef} className="text-center">
                    {loading && <span className="text-white">Loading songs...</span>}
                </div>
            </div>
        </main>
    );
}
