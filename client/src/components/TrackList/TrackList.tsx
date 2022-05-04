import React from 'react';
import {ITrack} from "../../types/track";
import TrackItem from "../TrackItem/TrackItem";
import {Box, Grid} from "@mui/material";

export interface TrackListProps {
    tracks: ITrack[];
}
const TrackList : React.FC<TrackListProps> = ({tracks}) => {
    return (
            <Grid container direction="column">
                    {tracks.map((track, index) => {
                        return (
                            <TrackItem track={track} index={index}/>
                        )
                    }

                    )}
            </Grid>

    );
};

export default TrackList;