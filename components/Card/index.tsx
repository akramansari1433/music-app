import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { setActiveSong } from "../../slices/songsSlice";
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
            dispatch(setActiveSong({ imageUrl, name, audioUrl, artistName }));
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

    console.log(audioRef.current?.duration);

    return (
        <div
            className="w-full flex flex-row gap-5 items-center p-2 rounded-xl hover:bg-gray-800"
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
