"use client";
import { setActiveSong, setPlaying } from "@/slices/songsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { PauseIcon, SpeakerWaveIcon, PlayIcon } from "@heroicons/react/20/solid";
import { BackwardIcon, ForwardIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Player() {
    const { activeSong, isPlaying, songs } = useSelector((state: RootState) => state.songs);
    const dispatch = useDispatch<AppDispatch>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    function formatDuration(duration: number | undefined) {
        if (typeof duration === "number" && !isNaN(duration)) {
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);

            const formattedMinutes = String(minutes).padStart(2, "0");
            const formattedSeconds = String(seconds).padStart(2, "0");

            return `${formattedMinutes}:${formattedSeconds}`;
        }

        return "0:00";
    }
    //Play the next song
    const playNextSong = () => {
        const currentIndex = songs.findIndex((song) => song.id === activeSong?.id);
        const nextIndex = (currentIndex + 1) % songs.length;
        const nextSong = songs[nextIndex];
        dispatch(setActiveSong(nextSong));
        dispatch(setPlaying(true));
    };

    // Play the previous song
    const playPreviousSong = () => {
        const currentIndex = songs.findIndex((song) => song.id === activeSong?.id);
        const previousIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
        const previousSong = songs[previousIndex];
        dispatch(setActiveSong(previousSong));
        dispatch(setPlaying(true));
    };

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
            className={`fixed bottom-3 w-full dark:bg-black dark:text-white ${
                activeSong ? "z-50 h-20" : "h-0 -z-50"
            } overflow-hidden p-3 transition-all duration-300`}
        >
            {activeSong && (
                <div className="flex flex-row justify-between md:grid md:grid-cols-3 md:gap-10">
                    {/* Songs details */}
                    <div className="h-full flex-row items-center gap-x-3 md:flex">
                        <Image
                            className="h-16 w-full md:w-auto aspect-square rounded-md object-cover"
                            src={activeSong?.imageUrl}
                            alt="song-image"
                            width={50}
                            height={50}
                        />

                        <div className="hidden md:flex flex-col">
                            <span className="line-clamp-2">{activeSong?.name}</span>
                        </div>
                    </div>

                    {/* audio control */}
                    <div className="w-[80%] md:w-full h-full flex flex-col items-center justify-center gap-y-3">
                        <div className="flex flex-row items-end justify-between md:justify-center gap-5">
                            <div className="flex flex-row items-center gap-x-5">
                                <button id="play-prev-button" aria-label="Play Prev" onClick={playPreviousSong}>
                                    <BackwardIcon className="h-6 w-6" />
                                </button>
                                <button
                                    id="player-play-pause-button"
                                    aria-label="Play/Pause Button"
                                    className="rounded-full bg-black dark:bg-white p-2 text-white dark:text-black"
                                    onClick={() => dispatch(setPlaying(!isPlaying))}
                                >
                                    {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                                </button>
                                <button id="play-next-button" aria-label="Play Next" onClick={playNextSong}>
                                    <ForwardIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                        <div className="flex w-full justify-center flex-row items-center gap-3">
                            <span className="text-xs">{formatDuration(currentTime)}</span>
                            <input
                                className="accent-slate-500 w-full md:w-60 lg:w-72"
                                type="range"
                                min={0}
                                max={audioRef.current?.duration! || ""}
                                step={0.1}
                                value={currentTime}
                                onChange={(e) => {
                                    audioRef.current!.currentTime = Number(e.target.value);
                                }}
                            />
                            <span className="text-xs">{formatDuration(audioRef.current?.duration!)}</span>
                        </div>
                    </div>

                    {/* volume slider */}
                    <div className="hidden md:flex justify-end h-full w-auto flex-row items-center gap-3">
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
                        onEnded={playNextSong}
                        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime!)}
                        muted={muted}
                    ></audio>
                </div>
            )}
        </div>
    );
}
