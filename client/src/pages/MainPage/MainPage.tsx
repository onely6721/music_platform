import React, {useEffect, useState} from 'react';
import {ITrack} from "../../types/track";
import AlbumList from "../../components/AlbumList/AlbumList";
import {albumAPI} from "../../service/AlbumService";
import {IAlbum} from "../../types/album";
import './index.css'
import Test from "../../components/test/test";



const MainPage: React.FC = () => {
    const [page, setPage] = useState(0)
    const {data: albums, isLoading, isError, error} = albumAPI.useFetchAllAlbumsQuery(page)
    const [data, setData] = useState<IAlbum[]>([])

    useEffect(() => {
        if(albums) {
            setData([...data,...albums])
        }
    }, [albums])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    })

    const scrollHandler = (e:any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight  ) < 100) {
            setPage(page + 1)
        }
    }

    if(isLoading) {
        return <div>Загрузка</div>
    }

    if(isError) {
        return <div>{error}</div>
    }

    const load = () => {
        setPage(page + 1)
    }

    return (
        <div className="main-page">
            {data && <AlbumList albums={data}/>}
            <button onClick={load}>ИЩО</button>
        </div>
    );
};

export default MainPage;