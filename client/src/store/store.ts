import {combineReducers, configureStore, createReducer} from '@reduxjs/toolkit'
import playerReducer from './reducers/PlayerSlice'
import {trackAPI} from "../service/TrackService";
import {albumAPI} from "../service/AlbumService";
import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension";

const rootReducer = combineReducers({
    playerReducer,
    [trackAPI.reducerPath]: trackAPI.reducer,
    [albumAPI.reducerPath]: albumAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(trackAPI.middleware)
                .concat(albumAPI.middleware),
        devTools: true

    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']