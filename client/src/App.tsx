import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./store/hooks/redux";
import {trackAPI} from "./service/TrackService";
import Player from "./components/Player/Player";
import {albumAPI} from "./service/AlbumService";
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom"

function App() {
    const {pause, activeTrack} = useAppSelector((state) => state.playerReducer)
    const dispatch = useAppDispatch()
    const routes = useRoutes()
    const {data: tracks} = trackAPI.useFetchAllTracksQuery()
    const {data: albums} = albumAPI.useFetchAllAlbumsQuery()

    return (
        <div className="App">
            <Router>
                {routes}
            </Router>
            <Player/>
        </div>
    )
}

export default App;
