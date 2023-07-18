"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, onSaveSong, setActiveSong, setPlaying } from "../slices/songsSlice";
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
    const { songs, loading, isPlaying, activeSong, savedSongs } = useSelector((state: RootState) => state.songs);
    const [offset, setOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    function onIntersection(enteries: IntersectionObserverEntry[]) {
        const firstEntry = enteries[0];
        if (firstEntry.isIntersecting) {
            setOffset((prev) => prev + 1);
        }
    }

    const onPlayPause = (song: Song) => {
        if (activeSong && activeSong.id === song.id) {
            dispatch(setPlaying(!isPlaying));
        } else {
            dispatch(setActiveSong(song));
            dispatch(setPlaying(true));
        }
    };

    const isSaved = (id: string) => {
        const saved = savedSongs.some((song: Song) => song.id === id);
        if (saved) {
            return true;
        }
        return false;
    };

    const onSave = (song: Song) => {
        dispatch(onSaveSong(song));
    };

    useEffect(() => {
        dispatch(fetchSongs(offset));
    }, [dispatch, offset]);

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
    }, [songs.length]);

    return (
        <main
            className={`fixed inset-x-0 top-20 mx-3 my-1 overflow-auto rounded-lg bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-900 p-2 md:p-5 lg:ml-[19.75rem] 
            ${activeSong ? "bottom-24" : "bottom-3"} 
            ${status === "loading" ? "opacity-0" : ""} transition-all duration-300`}
        >
            <div>
                <div className="flex flex-col">
                    {songs.map((song, idx) => (
                        <Song
                            key={idx}
                            song={song}
                            isPlaying={isPlaying}
                            onPlayPause={onPlayPause}
                            activeSong={activeSong!}
                            isSaved={isSaved(song.id)}
                            onSave={onSave}
                        />
                    ))}
                </div>

                <div ref={containerRef} className="text-center">
                    {loading && <span className="text-white">Loading songs...</span>}
                </div>
            </div>
        </main>
    );
}
