import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
    pauseCurrentSong,
    playCurrentSong,
    setCurrentSong,
} from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

interface CardProps {
    imageUrl: string;
    name: string;
    audioUrl: string;
    artistName: string;
}

export default function Card({
    imageUrl,
    name,
    audioUrl,
    artistName,
}: CardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const currentSong = useSelector(
        (state: RootState) => state.songs.currentSong
    );

    useEffect(() => {
        // Pause the audio if the current song changes
        if (
            currentSong &&
            currentSong.audioUrl !== audioUrl &&
            audioRef.current
        ) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [currentSong, audioUrl]);

    const playSong = () => {
        if (currentSong && currentSong.audioUrl === audioUrl) {
            // Pause the audio if it's the same song
            dispatch(pauseCurrentSong());
            setIsPlaying(false);
        } else {
            dispatch(setCurrentSong({ imageUrl, name, audioUrl, artistName }));
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        // Play or pause the audio based on the isPlaying state
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <div
            className="w-full flex flex-row gap-5 items-center p-3"
            onClick={playSong}
        >
            <Image
                className="object-cover aspect-square rounded-md"
                src={imageUrl}
                alt="song-image"
                height={75}
                width={75}
                loading="lazy"
            />
            <div className="w-1/3">
                <span className="text-white text-sm mt-3 font-mono line-clamp-1">
                    {name}
                </span>
                <span className="text-white text-xs mt-3 font-mono line-clamp-1">
                    {artistName}
                </span>
            </div>
            <audio ref={audioRef} src={audioUrl}></audio>
        </div>
    );
}
