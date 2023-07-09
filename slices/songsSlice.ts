import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async (offset: number) => {
    const response = await fetch(`https://itunes.apple.com/search/?term=top100&offset=${offset}&limit=10`);
    const data = await response.json();
    return data.results.map((song: any) => ({
        id: song.trackId,
        imageUrl: song.artworkUrl100,
        name: song.trackName,
        audioUrl: song.previewUrl,
        artistName: song.artistName,
    }));
});

export const searchSongs = createAsyncThunk("songs/searchSongs", async (searchTerm: string) => {
    const response = await fetch(`https://itunes.apple.com/search/?term=${searchTerm}&offset=0&limit=0`);
    const data = await response.json();
    return data.results.map((song: any) => ({
        id: song.trackId,
        imageUrl: song.artworkUrl100,
        name: song.trackName,
        audioUrl: song.previewUrl,
        artistName: song.artistName,
    }));
});

interface SongsState {
    songs: Song[];
    loading: boolean;
    error: string | null;
    activeSong: {
        id: string;
        imageUrl: string;
        name: string;
        audioUrl: string;
        artistName: string;
        duration: number;
        progress: number;
    } | null;
    isPlaying: boolean;
    savedSongs: Song[];
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null,
    activeSong: null,
    isPlaying: false,
    savedSongs: [],
};

const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            state.activeSong = action.payload;
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        getSavedSongs: (state) => {
            const savedSongsData = JSON.parse(localStorage.getItem("savedSongs") || "[]");
            state.savedSongs = savedSongsData;
        },
        onSaveSong: (state, action) => {
            const { id } = action.payload;
            const existingSongIndex = state.savedSongs.findIndex((song) => song.id === id);

            if (existingSongIndex !== -1) {
                state.savedSongs.splice(existingSongIndex, 1);
            } else {
                state.savedSongs.push(action.payload);
            }
            localStorage.setItem("savedSongs", JSON.stringify(state.savedSongs));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songs.push(...action.payload);
                songsSlice.caseReducers.getSavedSongs(state);
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            })
            .addCase(searchSongs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songs = action.payload;
            })
            .addCase(searchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            });
    },
});

export const { setActiveSong, setPlaying, getSavedSongs, onSaveSong } = songsSlice.actions;
export default songsSlice.reducer;
