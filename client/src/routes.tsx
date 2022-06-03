import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AlbumDetailPage from "./pages/AlbumDetailPage/AlbumDetailPage";
import {useAppSelector} from "./store/hooks/redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

export const useRoutes = () => {
    const {isLoggedIn} = useAppSelector((state) => state.authReducer)

    if(!isLoggedIn) {
        return(
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/albums/:id" element={<AlbumDetailPage/>}/>
        </Routes>
    )
}