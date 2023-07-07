"use client";
import { setPlaying } from "@/slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { PauseIcon, SpeakerWaveIcon } from "@heroicons/react/20/solid";
import { BackwardIcon, ForwardIcon, PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MusicPlayer() {
    const { activeSong, isPlaying } = useSelector(
        (state: RootState) => state.songs
    );
    const dispatch = useDispatch<AppDispatch>();
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
                            <span className="text-xs">0:00</span>
                            <div className="h-1.5 w-full md:w-36 rounded-md bg-gray-300"></div>
                            <span className="text-xs">3:00</span>
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
