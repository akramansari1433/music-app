import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
    setActiveSong,
    setActiveSongProgress,
    setPlaying,
} from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/20/solid";

export default function Card({
    id,
    imageUrl,
    name,
    audioUrl,
    artistName,
}: Song) {
    const dispatch = useDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const activeSong = useSelector(
        (state: RootState) => state.songs.activeSong
    );
    const isPlaying = useSelector((state: RootState) => state.songs.isPlaying);
    const [isSaved, setIsSaved] = useState<boolean>(() => {
        const savedSongs = JSON.parse(
            localStorage.getItem("savedSongs") || "[]"
        );
        return savedSongs.some((song: Song) => song.id === id);
    });

    useEffect(() => {
        if (activeSong && activeSong.id === id && audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, activeSong, id]);

    const playSong = () => {
        if (activeSong && activeSong.id === id) {
            dispatch(setPlaying(!isPlaying));
        } else {
            const audioElement = new Audio(audioUrl);
            audioElement.addEventListener("loadedmetadata", () => {
                dispatch(
                    setActiveSong({
                        id,
                        imageUrl,
                        name,
                        audioUrl,
                        artistName,
                        duration: audioElement.duration,
                    })
                );
                dispatch(setPlaying(true));
            });
        }
    };

    const handleSaveSong = () => {
        // Retrieve the saved songs from local storage
        const savedSongs = JSON.parse(
            localStorage.getItem("savedSongs") || "[]"
        );

        const song = {
            id,
            imageUrl,
            name,
            audioUrl,
            artistName,
        };

        if (isSaved) {
            // Remove the song from saved songs
            const updatedSavedSongs = savedSongs.filter(
                (savedSong: Song) => savedSong.id !== id
            );
            localStorage.setItem(
                "savedSongs",
                JSON.stringify(updatedSavedSongs)
            );
            setIsSaved(false);
        } else {
            // Add the song to saved songs
            savedSongs.push(song);
            localStorage.setItem("savedSongs", JSON.stringify(savedSongs));
            setIsSaved(true);
        }
    };

    return (
        <div className="w-full flex flex-row items-center justify-between p-2 rounded-xl hover:bg-gray-800">
            <div className="flex flex-row gap-5 items-center">
                <Image
                    className="object-cover w-16 h-16 md:w-20 md:h-20 rounded-md"
                    src={imageUrl}
                    alt="song-image"
                    height={100}
                    width={100}
                    loading="eager"
                />
                <div>
                    <span className="text-white text-sm font-mono line-clamp-2 md:line-clamp-1">
                        {name}
                    </span>
                    <span className="hidden md:block text-white text-xs font-mono line-clamp-1">
                        {artistName}
                    </span>
                </div>
            </div>

            <div className="ml-3 flex flex-row gap-x-5 md:gap-x-8 items-center">
                <button
                    id={id + `-save-song`}
                    aria-label="Save Song"
                    className="rounded-full shadow-2xl"
                    onClick={handleSaveSong}
                >
                    <HeartIcon
                        className={`h-6 w-6 ${
                            isSaved ? "text-red-500" : "text-white"
                        }`}
                    />
                </button>
                <button
                    id={id + `-play-pause-button`}
                    aria-label="Play/Pause Button"
                    className="bg-white rounded-full p-2 shadow-2xl"
                    onClick={playSong}
                >
                    {activeSong && activeSong.id === id && isPlaying ? (
                        <PauseIcon className="h-5 w-5" />
                    ) : (
                        <PlayIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            {activeSong && activeSong.id === id && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => dispatch(setPlaying(false))}
                    onTimeUpdate={() =>
                        dispatch(
                            setActiveSongProgress(audioRef.current?.currentTime)
                        )
                    }
                ></audio>
            )}
        </div>
    );
}
