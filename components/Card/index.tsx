import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { setActiveSong } from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/20/solid";

interface Song {
    id: string;
    imageUrl: string;
    name: string;
    audioUrl: string;
    artistName: string;
}

export default function Card({
    id,
    imageUrl,
    name,
    audioUrl,
    artistName,
}: Song) {
    const dispatch = useDispatch<AppDispatch>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const activeSong = useSelector(
        (state: RootState) => state.songs.activeSong
    );

    useEffect(() => {
        if (
            activeSong &&
            activeSong.audioUrl !== audioUrl &&
            audioRef.current
        ) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [activeSong, audioUrl]);

    const playSong = () => {
        if (activeSong && activeSong.audioUrl === audioUrl) {
            setIsPlaying(false);
        } else {
            dispatch(
                setActiveSong({
                    id,
                    imageUrl,
                    name,
                    audioUrl,
                    artistName,
                })
            );
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    function convertDuration(durationInSeconds: number) {
        var minutes = Math.floor(durationInSeconds / 60);
        var seconds = Math.round(durationInSeconds % 60);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    return (
        <div className="w-full flex flex-row justify-between items-center p-2 rounded-xl hover:bg-gray-800">
            <div className="flex flex-row w-full gap-5 items-center">
                <Image
                    className="object-cover aspect-square rounded-md"
                    src={imageUrl}
                    alt="song-image"
                    height={75}
                    width={75}
                    loading="eager"
                />
                <div className="w-1/3">
                    <span className="text-white text-sm mt-3 font-mono line-clamp-1">
                        {name}
                    </span>
                    <span className="text-white text-xs mt-3 font-mono line-clamp-1">
                        {artistName}
                    </span>
                </div>
            </div>

            <div className="flex flex-row items-center">
                <span className="text-sm text-white">
                    {convertDuration(audioRef.current?.duration!)}
                </span>
                <button
                    className="mx-5 bg-white rounded-full p-2 shadow-2xl"
                    onClick={playSong}
                >
                    {isPlaying ? (
                        <PauseIcon className="h-5 w-5" />
                    ) : (
                        <PlayIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            <audio ref={audioRef} src={audioUrl}></audio>
        </div>
    );
}
