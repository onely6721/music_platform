import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AlbumDetailPage from "./pages/AlbumDetailPage/AlbumDetailPage";

export const useRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/albums/:id" element={<AlbumDetailPage/>}/>
        </Routes>
    )
}