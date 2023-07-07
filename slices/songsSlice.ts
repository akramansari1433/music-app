import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("songs/fetcSongs", async () => {
    const response = await fetch(
        `https://itunes.apple.com/search/?term=bollywood&offset=0&limit=50`
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

interface Song {
    id: string;
    imageUrl: string;
    name: string;
    audioUrl: string;
    artistName: string;
}

interface SongsState {
    songs: Song[]; // Replace 'any' with the actual type of your user object
    loading: boolean;
    error: string | null;
    activeSong: Song | null;
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null,
    activeSong: null,
};

const userSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            state.activeSong = action.payload;
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
            });
    },
});

export const { setActiveSong } = userSlice.actions;
export default userSlice.reducer;
