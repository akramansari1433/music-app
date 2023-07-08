"use client";
import { setPlaying } from "@/slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
    PauseIcon,
    SpeakerWaveIcon,
    PlayIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MusicPlayer() {
    const { activeSong, isPlaying } = useSelector(
        (state: RootState) => state.songs
    );
    const dispatch = useDispatch<AppDispatch>();

    function formatDuration(duration: number) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div
            className={`text-white bg-black  fixed bottom-0 w-full ${
                activeSong ? "h-20 z-50" : "h-0"
            } transition-all duration-300 p-3 overflow-hidden`}
        >
            {activeSong && (
                <div className="flex flex-row justify-between">
                    <div className="hidden md:flex flex-row items-center gap-x-3 max-w-xs">
                        <Image
                            className="aspect-square object-cover rounded-md"
                            src={activeSong?.imageUrl}
                            alt="song-image"
                            width={50}
                            height={50}
                        />

                        <div className="flex flex-col">
                            <span className="line-clamp-1">
                                {activeSong?.name}
                            </span>
                            <span className="text-xs line-clamp-1">
                                {activeSong && activeSong.artistName}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-fit flex flex-col gap-2">
                        <div className="flex flex-row items-center justify-center gap-5">
                            <button
                                className="bg-white text-black rounded-full p-2"
                                onClick={() => dispatch(setPlaying(!isPlaying))}
                            >
                                {isPlaying ? (
                                    <PauseIcon className="h-6 w-6" />
                                ) : (
                                    <PlayIcon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                        <div className="w-full md:fit flex flex-row items-center gap-3">
                            <span className="text-xs">
                                {formatDuration(activeSong.progress)}
                            </span>
                            <input
                                className="w-full md:w-36"
                                type="range"
                                min={0}
                                max={activeSong.duration}
                                value={activeSong.progress || 0}
                                readOnly
                            />
                            <span className="text-xs">
                                {formatDuration(activeSong.duration)}
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:flex flex-row items-center gap-3 h-full w-64">
                        <SpeakerWaveIcon className="h-6 w-6" />
                        <div className="h-1.5 w-[70%] bg-gray-300 rounded-md"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
