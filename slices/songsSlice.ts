import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("songs/fetcSongs", async () => {
    const response = await fetch(
        `https://itunes.apple.com/search/?term=bollywood&offset=0&limit=50`
    );
    const data = await response.json();
    return data.results;
});

interface SongsState {
    songs: any[]; // Replace 'any' with the actual type of your user object
    loading: boolean;
    error: string | null;
    currentSong?: {
        imageUrl: string;
        name: string;
        audioUrl: string;
    };
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {},
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

export default userSlice.reducer;
