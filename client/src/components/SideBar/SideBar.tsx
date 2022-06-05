import React from 'react';
import './index.css'
import {albumAPI} from "../../service/AlbumService";

const SideBar = () => {

    const {data: albums, isLoading, isError, error} = albumAPI.useFetchOwnPlaylistsQuery()

    return (
        <div className="side-bar">
            <h1>Spotify</h1>
            <div>Home</div>
            <div>Search</div>
            <div>Your library</div>
            <br/>
            <div>Create Playlist</div>
            <div>Liked songs</div>
            <hr/>
            {albums && albums.map((album) =>
                <div>
                    <p>{album.name}</p>
                </div>
            )}
        </div>
    );
};

export default SideBar;