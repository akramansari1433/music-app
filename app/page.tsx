"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, fetchMoreSongs } from "../slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Card from "@/components/Card";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { songs, loading, error, activeSong } = useSelector(
        (state: RootState) => state.songs
    );
    const [loadingMore, setLoadingMore] = useState(false);
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

    if (loading && songs.length === 0) {
        return <div className="text-white p-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-white p-5">Error: {error}</div>;
    }

    return (
        <main
            className={`lg:ml-[19.75rem] mx-3 my-1 fixed top-20 ${
                activeSong ? "bottom-24" : "bottom-3 z-10"
            } transition-all duration-300 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg p-5`}
        >
            <div className="flex flex-col">
                {songs.map((song, idx) => (
                    <Card key={idx} {...song} />
                ))}
            </div>
            <div ref={containerRef}>Loading more songs...</div>
        </main>
    );
}
