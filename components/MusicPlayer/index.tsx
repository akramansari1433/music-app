import { SpeakerWaveIcon } from "@heroicons/react/20/solid";
import { BackwardIcon, ForwardIcon, PlayIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function MusicPlayer() {
    return (
        <div className="text-white fixed bottom-3 w-full h-14 flex flex-row justify-between overflow-hidden">
            <div className="flex flex-row items-center gap-x-3">
                <div className="bg-white text-black text-sm h-full w-14 flex items-center justify-center rounded-md">
                    Song <br /> name
                </div>
                <div className="flex flex-col">
                    <span>Song Name</span>
                    <span className="text-xs">Artist Name</span>
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
    );
}
