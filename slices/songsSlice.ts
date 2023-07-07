import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
    const response = await fetch(
        `https://itunes.apple.com/search/?term=top100&offset=0&limit=10`
    );
    const data = await response.json();
    return data.results.map((song: any) => ({
        id: song.trackId,
        imageUrl: song.artworkUrl100,
        name: song.trackName,
        audioUrl: song.previewUrl,
        artistName: song.artistName,
    }));
});

export const fetchMoreSongs = createAsyncThunk(
    "songs/fetchMoreSongs",
    async (offset: number) => {
        const response = await fetch(
            `https://itunes.apple.com/search/?term=bollywood&offset=${offset}&limit=10`
        );
        const data = await response.json();
        return data.results.map((song: any) => ({
            id: song.trackId,
            imageUrl: song.artworkUrl100,
            name: song.trackName,
            audioUrl: song.previewUrl,
            artistName: song.artistName,
        }));
    }
);

export const searchSongs = createAsyncThunk(
    "songs/searchSongs",
    async (searchTerm: string) => {
        const response = await fetch(
            `https://itunes.apple.com/search/?term=${searchTerm}&offset=0&limit=0`
        );
        const data = await response.json();
        return data.results.map((song: any) => ({
            id: song.trackId,
            imageUrl: song.artworkUrl100,
            name: song.trackName,
            audioUrl: song.previewUrl,
            artistName: song.artistName,
        }));
    }
);

interface Song {
    id: string;
    imageUrl: string;
    name: string;
    audioUrl: string;
    artistName: string;
}

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
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null,
    activeSong: null,
    isPlaying: false,
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
        setActiveSongProgress: (state, action) => {
            if (state.activeSong) {
                state.activeSong = {
                    ...state.activeSong,
                    progress: action.payload,
                };
            }
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
                state.songs = action.payload;
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
            })
            .addCase(fetchMoreSongs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoreSongs.fulfilled, (state, action) => {
                state.loading = false;
                const newSongs = action.payload.filter(
                    (newSong: Song) =>
                        !state.songs.some((song) => song.id === newSong.id)
                );
                state.songs.push(...newSongs);
            })
            .addCase(fetchMoreSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            });
    },
});

export const { setActiveSong, setPlaying, setActiveSongProgress } =
    songsSlice.actions;
export default songsSlice.reducer;
