
import {ITrack} from "../types/track";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const trackAPI = createApi({
    reducerPath: "trackAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}),
    endpoints: (build) => ({
        fetchAllTracks: build.query<ITrack[], void>({
            query: () => ({
                url: "tracks"
            })
        }),
        fetchOneTrack: build.query<ITrack, string>({
            query: (id) => `tracks/${id}`
        }),
        addListenToTrack: build.mutation<ITrack, string>({
            query: (id) => ({
                url: `tracks/listens/${id}`,
                method: "POST"
            })
        })
    })
})


