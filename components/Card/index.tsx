import Image from "next/image";
import React, { useRef, useState } from "react";

interface CardProps {
    imageUrl: string;
    name: string;
    audioUrl: string;
}

export default function Card({ imageUrl, name, audioUrl }: CardProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = () => {
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
            <span className="text-white text-sm mt-3 font-mono">{name}</span>
            <audio ref={audioRef} src={audioUrl}></audio>
        </div>
    );
}
