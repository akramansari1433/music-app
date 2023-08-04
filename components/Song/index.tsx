import Image from "next/image";
import { HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal";
import { useState } from "react";
import Button from "../Button";

interface SongProps {
    song: Song;
    isSaved: boolean;
    activeSong: Song;
    isPlaying: boolean;
    onPlayPause: (song: Song) => void;
    onSave: (song: Song) => void;
}

export default function Song({ song, isSaved, isPlaying, activeSong, onPlayPause, onSave }: SongProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex w-full flex-row items-center justify-between rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div
                className="flex flex-row items-center gap-5 cursor-pointer"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                <Image
                    className="h-16 w-16 rounded-md object-cover md:h-20 md:w-20"
                    src={song.imageUrl}
                    alt="song-image"
                    height={100}
                    width={100}
                    loading="eager"
                />
                <div>
                    <span className="line-clamp-2 text-sm dark:text-white md:line-clamp-1">{song.name}</span>
                    <span className="line-clamp-1 hidden text-xs dark:text-white md:block">{song.artistName}</span>
                </div>
            </div>

            <div className="ml-3 flex flex-row items-center gap-x-5 md:gap-x-8">
                <Button
                    id={song.id + `-save-song`}
                    accessibleLabel="Save Song"
                    className="rounded-full p-2 bg-transparent dark:bg-transparent text-black dark:text-white"
                    icon={<HeartIcon className={`h-6 w-6 ${isSaved ? "text-red-500" : ""}`} />}
                    onClick={() => onSave(song)}
                />
                <Button
                    id={song.id + `-play-pause-button`}
                    accessibleLabel="Play/Pause Button"
                    className="rounded-full p-2 shadow-2xl"
                    onClick={() => onPlayPause(song)}
                    icon={
                        activeSong && activeSong.id === song.id && isPlaying ? (
                            <PauseIcon className="h-5 w-5" />
                        ) : (
                            <PlayIcon className="h-5 w-5" />
                        )
                    }
                />
            </div>

            <Modal open={isModalOpen} setOpen={setIsModalOpen}>
                <div className="p-5">
                    <div className="relative h-72 mt-10">
                        <Image className="object-cover rounded-md" src={song.imageUrl} alt="image" fill />
                    </div>
                    <div className="flex flex-row items-center py-5 gap-3">
                        <div className="w-full">
                            <h1 className="text-lg md:text-2xl font-semibold">{song.name}</h1>
                            <h2 className="text-sm md:text-lg">By {song.artistName}</h2>
                        </div>
                        <div>
                            <Button
                                id={song.id + `-play-pause-button`}
                                accessibleLabel="Play/Pause Button"
                                className="rounded-full p-2"
                                onClick={() => onPlayPause(song)}
                                icon={
                                    activeSong && activeSong.id === song.id && isPlaying ? (
                                        <PauseIcon className="h-5 w-5 text-white dark:text-black" />
                                    ) : (
                                        <PlayIcon className="h-5 w-5 text-white dark:text-black" />
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
