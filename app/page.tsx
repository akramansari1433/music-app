"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { songs, loading, error } = useSelector(
        (state: RootState) => state.songs
    );

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log("songs:", songs);
    return (
        <main className="p-5">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5">
                {songs.map((song, idx) => (
                    <div
                        key={idx}
                        className=" max-w-sm w-full border rounded-xl flex flex-col items-center p-3 hover:scale-105 duration-300"
                    >
                        <Image
                            className="object-cover"
                            src={song.artworkUrl100}
                            alt={song.collectionName}
                            height={150}
                            width={200}
                            loading="lazy"
                        />
                        <span className="text-white text-sm mt-3 font-mono">
                            {song.artistName}
                        </span>
                    </div>
                ))}
            </div>
        </main>
    );
}
