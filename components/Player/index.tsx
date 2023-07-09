"use client";
import { setPlaying } from "@/slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { PauseIcon, SpeakerWaveIcon, PlayIcon } from "@heroicons/react/20/solid";
import { SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MusicPlayer() {
    const { activeSong, isPlaying } = useSelector((state: RootState) => state.songs);
    const dispatch = useDispatch<AppDispatch>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    function formatDuration(duration: number) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        if (activeSong && audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, activeSong]);

    return (
        <div
            className={`fixed bottom-0  w-full bg-black text-white ${
                activeSong ? "z-50 h-20" : "h-0"
            } overflow-hidden p-3 transition-all duration-300`}
        >
            {activeSong && (
                <div className="flex flex-row justify-between">
                    <div className="hidden max-w-xs flex-row items-center gap-x-3 md:flex">
                        <Image
                            className="aspect-square rounded-md object-cover"
                            src={activeSong?.imageUrl}
                            alt="song-image"
                            width={50}
                            height={50}
                        />

                        <div className="flex flex-col">
                            <span className="line-clamp-1">{activeSong?.name}</span>
                            <span className="line-clamp-1 text-xs">{activeSong && activeSong.artistName}</span>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-2 md:w-fit">
                        <div className="flex flex-row items-center justify-center gap-5">
                            <button
                                className="rounded-full bg-white p-2 text-black"
                                onClick={() => dispatch(setPlaying(!isPlaying))}
                            >
                                {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                            </button>
                        </div>
                        <div className="md:fit flex w-full flex-row items-center gap-3">
                            <span className="text-xs">{formatDuration(currentTime)}</span>
                            <input
                                className="w-full accent-slate-500 md:w-36"
                                type="range"
                                min={0}
                                max={audioRef.current?.duration!}
                                step={0.1}
                                value={currentTime}
                                onChange={(e) => {
                                    audioRef.current!.currentTime = Number(e.target.value);
                                }}
                            />
                            <span className="text-xs">{formatDuration(audioRef.current?.duration!)}</span>
                        </div>
                    </div>
                    <div className="hidden h-full w-64 flex-row items-center gap-3 md:flex">
                        <button
                            id="volume-mute-unmute"
                            aria-label="Volume mute/unmute"
                            onClick={() => setMuted(!muted)}
                        >
                            {muted || audioRef.current?.volume === 0 ? (
                                <SpeakerXMarkIcon className="h-6 w-6" />
                            ) : (
                                <SpeakerWaveIcon className="h-6 w-6" />
                            )}
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e) => {
                                audioRef.current!.volume = Number(e.target.value);
                            }}
                        />
                    </div>
                    <audio
                        ref={audioRef}
                        src={activeSong.audioUrl}
                        onEnded={() => {
                            dispatch(setPlaying(false));
                            audioRef.current!.currentTime = 0;
                        }}
                        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime!)}
                        muted={muted}
                    ></audio>
                </div>
            )}
        </div>
    );
}
