
import {IAlbum} from "../types/album";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const albumAPI = createApi({
    reducerPath: "albumAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}),
    endpoints: (build) => ({
        fetchAllAlbums: build.query<IAlbum[], number | void>({
            query: (page = 0) => `albums?page=${page}`
        }),
        fetchOneAlbum: build.query<IAlbum, string>({
            query: (id) => `albums/${id}`
        })
    })
})


