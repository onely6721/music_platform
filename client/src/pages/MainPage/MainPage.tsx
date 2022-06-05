import React, {useEffect, useState} from 'react';
import {ITrack} from "../../types/track";
import AlbumList from "../../components/AlbumList/AlbumList";
import {albumAPI} from "../../service/AlbumService";
import {IAlbum} from "../../types/album";
import './index.css'
import Test from "../../components/test/test";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import {useAppDispatch} from "../../store/hooks/redux";
import {logout} from "../../store/actions/UserActionCreator";
import SideBar from "../../components/SideBar/SideBar";



const MainPage: React.FC = () => {
    const [page, setPage] = useState(0)
    const {data: albums, isLoading, isError, error} = albumAPI.useFetchAllAlbumsQuery(page)
    const [data, setData] = useState<IAlbum[]>([])
    const dispatch = useAppDispatch()

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
    const handleLogout = (e:any) => {
        dispatch(logout())
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
            <SideBar/>
            <div style={{width: "70%"}}>
                {data && <AlbumList albums={data}/>}
                <button onClick={handleLogout}> Logout</button>
            </div>
        </div>
    );
};

export default MainPage;