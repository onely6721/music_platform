import React, {useEffect} from 'react';
import {IAlbum} from "../../types/album";
import './index.css'
import {albumAPI} from "../../service/AlbumService";
import TrackList from "../../components/TrackList/TrackList";
import {useParams} from "react-router-dom";
import {setActiveAlbum} from "../../store/reducers/PlayerSlice";
import {useDispatch} from "react-redux";

interface AlbumDetailPageProps{
    album: IAlbum
}


const AlbumDetailPage = () => {
    const albumId = useParams<string>().id
    const {data: album, isLoading, isError} = albumAPI.useFetchOneAlbumQuery(albumId || "")
    const dispatch = useDispatch()

    useEffect(()=>{
        if(album)
            dispatch(setActiveAlbum(album))
    },[isLoading])

    if(isLoading) {
        return <div>Ошибка</div>
    }
    if(isError) {
        return <div>Error</div>
    }

    return (
        <div className="album-detail">
            {album &&
                <div className="album-head">
                    {album.picture
                        ? <img src={"http://localhost:8000/" + album.picture} alt="" className="album-detail-img"/>
                        : <img src={"https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE"} alt="" className="album-detail-img"/>
                    }
                    <div className={"album-detail-name"}>
                        <p>Album</p>
                        <h1>{album.name}</h1>
                    </div>
                </div>
            }

            <div className="album-table-head">
                <div className="column-title"># Title</div>
                <div className="column-listens">Listens</div>
            </div>

            <hr/>

            {album &&
                <div className={"album-track-list"}>
                    <TrackList tracks={album.tracks} />
                </div>
            }

        </div>
    );
};

export default AlbumDetailPage;