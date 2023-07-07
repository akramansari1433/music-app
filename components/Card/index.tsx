import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { setActiveSong, setPlaying } from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
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
    const dispatch = useDispatch();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const activeSong = useSelector(
        (state: RootState) => state.songs.activeSong
    );
    const isPlaying = useSelector((state: RootState) => state.songs.isPlaying);

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
            dispatch(
                setActiveSong({
                    id,
                    imageUrl,
                    name,
                    audioUrl,
                    artistName,
                })
            );
            dispatch(setPlaying(true));
        }
    };

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
                <button
                    className="mx-5 bg-white rounded-full p-2 shadow-2xl"
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
                ></audio>
            )}
        </div>
    );
}
