"use client";
import { RootState } from "@/store/store";
import { SpeakerWaveIcon } from "@heroicons/react/20/solid";
import { BackwardIcon, ForwardIcon, PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function MusicPlayer() {
    const { activeSong } = useSelector((state: RootState) => state.songs);
    return (
        activeSong && (
            <div className="text-white bg-black z-50 fixed bottom-0 w-full h-20 p-3 overflow-hidden">
                <div className="hidden md:flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-x-3 max-w-xs">
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
                                {activeSong.artistName}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center justify-center gap-5">
                            <BackwardIcon className="h-6 w-6" />
                            <PlayIcon className="h-8 w-8 p-2 bg-white text-black rounded-full" />
                            <ForwardIcon className="h-6 w-6" />
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <span className="text-xs">0:00</span>
                            <div className="h-1.5 w-36 rounded-md bg-gray-300"></div>
                            <span className="text-xs">3:00</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-3 h-full w-64">
                        <SpeakerWaveIcon className="h-6 w-6" />
                        <div className="h-1.5 w-[70%] bg-gray-300 rounded-md"></div>
                    </div>
                </div>

                {/* mobile player */}
                <div className="flex flex-col gap-3 md:hidden">
                    <div className="flex flex-row items-center justify-center gap-5">
                        <BackwardIcon className="h-6 w-6" />
                        <PlayIcon className="h-8 w-8 p-2 bg-white text-black rounded-full" />
                        <ForwardIcon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <span className="text-xs">0:00</span>
                        <div className="h-1.5 w-full rounded-md bg-gray-300"></div>
                        <span className="text-xs">3:00</span>
                    </div>
                </div>
            </div>
        )
    );
}
