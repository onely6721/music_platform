import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./store/hooks/redux";
import {trackAPI} from "./service/TrackService";
import Player from "./components/Player/Player";
import {albumAPI} from "./service/AlbumService";
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom"

function App() {
    const routes = useRoutes()
    useEffect(() => {

    }, [])
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
