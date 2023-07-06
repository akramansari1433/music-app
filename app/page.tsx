"use client"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../slices/songsSlice';
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {songs,loading, error } = useSelector((state: RootState) => state.songs);
 

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("songs:", songs)
  return (
      <main className="">
          <h1 className="text-5xl text-white">Music App</h1>
          {songs.map((song, idx) => (
              <div key={idx}>
                  <Image
                      src={song.artworkUrl100}
                      alt={song.collectionName}
                      height={100}
                      width={100}
                      loading="lazy"
                  />
                  <span>
                    {""}
                  </span>
              </div>
          ))}
      </main>
  );
}
