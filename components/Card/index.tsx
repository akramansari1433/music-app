import Image from "next/image";
import React, { useRef, useState } from "react";
import { setCurrentSong } from "../../slices/songsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

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

    const playSong = () => {
        dispatch(setCurrentSong({ imageUrl, name, audioUrl, artistName }));
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

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
