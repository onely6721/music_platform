import React from 'react';
import './index.css'
import {albumAPI} from "../../service/AlbumService";
import {useNavigate} from "react-router-dom";
import {IAlbum} from "../../types/album";

const SideBar = () => {

    const {data: albums, refetch} = albumAPI.useFetchOwnPlaylistsQuery()
    const [createAlbum, {}] = albumAPI.useCreateNewPlaylistMutation()
    const navigate = useNavigate()

    const handleOpenAlbum= (album: IAlbum) => {
        navigate(`/albums/${album._id}`)
    }

    const createPlaylist = async () => {
        await createAlbum({name: "new playlist", tracks: []})
        refetch()
    }


    return (
        <div className="side-bar">
            <h1>Spotify</h1>
            <p>Home</p>
            <p>Search</p>
            <p>Your library</p>
            <br/>
            <p onClick={createPlaylist}>Create Playlist</p>
            <p>Liked songs</p>
            <hr/>
            {albums && albums.map((album) =>
                <div>
                    <p onClick={() => handleOpenAlbum(album)}>{album.name}</p>
                </div>
            )}
        </div>
    );
};

export default SideBar;