"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, fetchMoreSongs } from "../slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Card from "@/components/Card";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { songs, loading, activeSong } = useSelector(
        (state: RootState) => state.songs
    );
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    function onIntersection(enteries: IntersectionObserverEntry[]) {
        const firstEntry = enteries[0];
        if (firstEntry.isIntersecting) {
            dispatch(fetchMoreSongs(songs.length));
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
            className={`lg:ml-[19.75rem] mx-3 my-1 fixed top-20 ${
                activeSong ? "bottom-24" : "bottom-3 z-10"
            } transition-all duration-300 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg p-5`}
        >
            {loading ? (
                <span className="text-white font-mono">Loading songs...</span>
            ) : (
                <div>
                    <div className="flex flex-col">
                        {songs.map((song, idx) => (
                            <Card key={idx} {...song} />
                        ))}
                    </div>

                    <div ref={containerRef} className="text-center">
                        <span className="text-white font-mono">
                            Loading more songs...
                        </span>
                    </div>
                </div>
            )}
        </main>
    );
}
