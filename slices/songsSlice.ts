import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongs = createAsyncThunk("songs/fetcSongs", async () => {
    const response = await fetch(
        `https://itunes.apple.com/search/?term=bollywood&offset=0&limit=50`
    );
    const data = await response.json();
    return data.results.map((song: any) => ({
        imageUrl: song.artworkUrl100,
        name: song.trackName,
        audioUrl: song.previewUrl,
        artistName: song.artistName,
    }));
});

interface Song {
    imageUrl: string;
    name: string;
    audioUrl: string;
    artistName: string;
}

interface SongsState {
    songs: Song[]; // Replace 'any' with the actual type of your user object
    loading: boolean;
    error: string | null;
    currentSong: {
        imageUrl: string;
        name: string;
        audioUrl: string;
        artistName: string;
        playing: boolean;
    } | null;
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    error: null,
    currentSong: null,
};

const userSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        playCurrentSong: (state) => {
            if (state.currentSong) state.currentSong.playing = true;
        },
        pauseCurrentSong: (state) => {
            if (state.currentSong) state.currentSong.playing = false;
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

export const { setCurrentSong, playCurrentSong, pauseCurrentSong } =
    userSlice.actions;
export default userSlice.reducer;
