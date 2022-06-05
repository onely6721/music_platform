
import {IAlbum} from "../types/album";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../store/store";
import {useAppSelector} from "../store/hooks/redux";


export const albumAPI = createApi({
    reducerPath: "albumAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).authReducer.user
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (build) => ({
        fetchAllAlbums: build.query<IAlbum[], number | void>({
            query: (page = 0) => `albums?page=${page}`
        }),
        fetchOneAlbum: build.query<IAlbum, string>({
            query: (id) => `albums/${id}`
        }),
        fetchOwnPlaylists: build.query<IAlbum[], void>({
            query: () =>  'albums/myPlaylists',
        })
    })
})


