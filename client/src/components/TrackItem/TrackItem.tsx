import React from 'react';
import {ITrack} from "../../types/track";
import './index.css'
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {pauseTrack, playTrack, setActiveTrack, setCurrentTime, setIndexTrack} from "../../store/reducers/PlayerSlice";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface TrackItemProps {
    track: ITrack;
    index?: number;
}

const TrackItem: React.FC<TrackItemProps> = ({track, index=0}) => {
    const {pause, activeTrack, volume, currentTime} = useAppSelector((state) => state.playerReducer)
    const dispatch = useAppDispatch()

    const play = (e:any) => {
        e.stopPropagation()
        dispatch(setActiveTrack(track))
        dispatch(setIndexTrack(index))
        if(pause){
            dispatch(playTrack())
        } else {
            dispatch(pauseTrack())
        }
    }

    return (
        <div className="track-item" >
            <div className="test">
                <IconButton onClick={play} style={{color:"white"}}>
                    {activeTrack && activeTrack._id == track._id && !pause
                        ? <PauseIcon/>
                        : <PlayArrowIcon/>
                    }
                </IconButton>
                <div>
                    <div style={{fontSize: 14}}>
                        {track.name}
                    </div>
                    <div style={{fontSize: 10, color: 'Grey'}}>
                        {track.artist}
                    </div>
                </div>
            </div>
            <IconButton style={{color:"white"}}>
                <FavoriteBorderIcon/>
            </IconButton>
            <div style={{fontSize: 10}}>
                {track.listens}
            </div>

        </div>
    );
};
export default TrackItem;