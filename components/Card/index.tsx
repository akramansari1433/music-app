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
            className=" max-w-sm w-full border rounded-xl flex flex-col items-center p-3 hover:scale-105 duration-300"
            onClick={playSong}
        >
            <Image
                className="object-cover max-h-44"
                src={imageUrl}
                alt="song-image"
                height={150}
                width={200}
                loading="lazy"
            />
            <span className="text-white text-sm mt-3 font-mono line-clamp-2">
                {name}
            </span>
            <span className="text-white text-xs mt-3 font-mono line-clamp-1">
                {artistName}
            </span>
            <audio ref={audioRef} src={audioUrl}></audio>
        </div>
    );
}
