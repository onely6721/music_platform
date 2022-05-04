import React from 'react';
import {IAlbum} from "../../types/album";
import './index.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../store/hooks/redux";
import {setActiveAlbum, setActiveTrack, setIndexTrack} from "../../store/reducers/PlayerSlice";

interface AlbumItemProps{
    album: IAlbum;
}

const AlbumItem:React.FC<AlbumItemProps> = ({album}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const handleClick = () => {
        navigate(`/albums/${album._id}`)

    }

    return (
            <div className="album-item" onClick={handleClick}>
                <div className="content">
                    <img src={"http://localhost:8000/" + album.picture} alt="" className="album-image"/>
                     <h4>{album.name}</h4>
                </div>
            </div>


    );
};

export default AlbumItem;