import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { onSaveSong, setActiveSong, setActiveSongProgress, setPlaying } from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/20/solid";

export default function Card({ id, imageUrl, name, audioUrl, artistName }: Song) {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, savedSongs } = useSelector((state: RootState) => state.songs);

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

    return (
        <div className="flex w-full flex-row items-center justify-between rounded-xl p-2 hover:bg-gray-800">
            <div className="flex flex-row items-center gap-5">
                <Image
                    className="h-16 w-16 rounded-md object-cover md:h-20 md:w-20"
                    src={imageUrl}
                    alt="song-image"
                    height={100}
                    width={100}
                    loading="eager"
                />
                <div>
                    <span className="line-clamp-2 text-sm text-white md:line-clamp-1">{name}</span>
                    <span className="line-clamp-1 hidden text-xs text-white md:block">{artistName}</span>
                </div>
            </div>

            <div className="ml-3 flex flex-row items-center gap-x-5 md:gap-x-8">
                <button
                    id={id + `-save-song`}
                    aria-label="Save Song"
                    className="rounded-full shadow-2xl"
                    onClick={() =>
                        dispatch(
                            onSaveSong({
                                id,
                                imageUrl,
                                name,
                                audioUrl,
                                artistName,
                            })
                        )
                    }
                >
                    <HeartIcon
                        className={`h-6 w-6 ${
                            savedSongs.some((song: Song) => song.id === id) ? "text-red-500" : "text-white"
                        }`}
                    />
                </button>
                <button
                    id={id + `-play-pause-button`}
                    aria-label="Play/Pause Button"
                    className="rounded-full bg-white p-2 shadow-2xl"
                    onClick={playSong}
                >
                    {activeSong && activeSong.id === id && isPlaying ? (
                        <PauseIcon className="h-5 w-5" />
                    ) : (
                        <PlayIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
