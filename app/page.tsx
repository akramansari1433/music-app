"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Card from "@/components/Card";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { songs, loading, error } = useSelector(
        (state: RootState) => state.songs
    );

    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    if (loading) {
        return <div className="text-white p-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-white p-5">Error: {error}</div>;
    }

    return (
        <main className="p-5">
            <div className="flex flex-col">
                {songs.map((song, idx) => (
                    <div key={idx}>
                        <Card
                            imageUrl={song.imageUrl}
                            name={song.name}
                            audioUrl={song.audioUrl}
                            artistName={song.artistName}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
