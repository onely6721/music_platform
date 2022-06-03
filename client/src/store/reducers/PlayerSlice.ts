import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {ITrack} from "../../types/track";
import {IAlbum} from "../../types/album";

interface  PlayerState {
    volume: number,
    duration: number,
    currentTime: number,
    activeTrack: null | ITrack,
    activeAlbum: null | IAlbum,
    indexTrack: number,
    pause: boolean,

}

// Define the initial state using that type
const initialState: PlayerState = {
    volume: 50,
    duration: 0,
    currentTime: 0,
    activeTrack: null,
    activeAlbum: null,
    indexTrack: 0,
    pause: true,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playTrack(state) {
            state.pause = false
        },
        pauseTrack(state) {
            state.pause = true
        },
        nextTrack(state) {
            state.indexTrack += 1
        },
        prevTrack(state) {
            state.indexTrack -= 1
        },
        setIndexTrack(state, action: PayloadAction<number>) {
            state.indexTrack = action.payload
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload
        },
        setActiveTrack(state, action: PayloadAction<ITrack>) {
            state.activeTrack = action.payload
        },
        setCurrentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload
        },
        setActiveAlbum(state, action: PayloadAction<IAlbum>) {
            state.activeAlbum = action.payload
        },


    },
})

export const {playTrack, pauseTrack, setVolume, setActiveTrack, setDuration, setCurrentTime, prevTrack, nextTrack, setActiveAlbum, setIndexTrack } = playerSlice.actions

export default playerSlice.reducer