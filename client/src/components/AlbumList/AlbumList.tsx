import React from 'react';
import {IAlbum} from "../../types/album";
import {Grid} from "@mui/material";
import AlbumItem from "../AlbumItem/AlbumItem";
import "./index.css"

interface AlbumListProps {
    albums: IAlbum[];
}


const AlbumList:React.FC<AlbumListProps> = ({albums}) => {
    return (
       <div className="album-list">
           {albums.map((album) =>
                   <AlbumItem album={album}/>
           )}
       </div>
    );
};

export default AlbumList;