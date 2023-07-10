import Image from "next/image";
import { onSaveSong, setActiveSong, setPlaying } from "../../slices/songsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import { PauseIcon } from "@heroicons/react/20/solid";
import Modal from "../Modal";
import { useState } from "react";

export default function Card({ id, imageUrl, name, audioUrl, artistName }: Song) {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, savedSongs } = useSelector((state: RootState) => state.songs);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="flex w-full flex-row items-center justify-between rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div
                className="flex flex-row items-center gap-5 cursor-pointer"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                <Image
                    className="h-16 w-16 rounded-md object-cover md:h-20 md:w-20"
                    src={imageUrl}
                    alt="song-image"
                    height={100}
                    width={100}
                    loading="eager"
                />
                <div>
                    <span className="line-clamp-2 text-sm dark:text-white md:line-clamp-1">{name}</span>
                    <span className="line-clamp-1 hidden text-xs dark:text-white md:block">{artistName}</span>
                </div>
            </div>

            <div className="ml-3 flex flex-row items-center gap-x-5 md:gap-x-8">
                <button
                    id={id + `-save-song`}
                    aria-label="Save Song"
                    className="rounded-full shadow-2xl"
                    onClick={() =>
                        dispatch(
                            onSaveSong({
                                id,
                                imageUrl,
                                name,
                                audioUrl,
                                artistName,
                            })
                        )
                    }
                >
                    <HeartIcon
                        className={`h-6 w-6 ${
                            savedSongs.some((song: Song) => song.id === id) ? "text-red-500" : "dark:text-white"
                        }`}
                    />
                </button>
                <button
                    id={id + `-play-pause-button`}
                    aria-label="Play/Pause Button"
                    className="rounded-full bg-black dark:bg-white p-2 shadow-2xl"
                    onClick={playSong}
                >
                    {activeSong && activeSong.id === id && isPlaying ? (
                        <PauseIcon className="h-5 w-5 text-white dark:text-black" />
                    ) : (
                        <PlayIcon className="h-5 w-5 text-white dark:text-black" />
                    )}
                </button>
            </div>

            <Modal open={isModalOpen} setOpen={setIsModalOpen}>
                <div className="p-5">
                    <div className="relative h-72 mt-10">
                        <Image className="object-fit rounded-md" src={imageUrl} alt="image" fill />
                    </div>
                    <div className="flex flex-row items-center py-5 gap-3">
                        <div className="w-full">
                            <h1 className="text-lg md:text-2xl font-semibold">{name}</h1>
                            <h2 className="text-sm md:text-lg">By {artistName}</h2>
                        </div>
                        <div>
                            <button
                                id={id + `-play-pause-button`}
                                aria-label="Play/Pause Button"
                                className="rounded-full bg-black dark:bg-white p-2 shadow-2xl"
                                onClick={playSong}
                            >
                                {activeSong && activeSong.id === id && isPlaying ? (
                                    <PauseIcon className="h-5 w-5 text-white dark:text-black" />
                                ) : (
                                    <PlayIcon className="h-5 w-5 text-white dark:text-black" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
