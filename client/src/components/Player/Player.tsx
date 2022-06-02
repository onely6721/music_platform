import * as React from 'react';
import './index.css'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {
    playTrack,
    pauseTrack,
    setActiveTrack,
    setDuration,
    setCurrentTime,
    nextTrack, prevTrack
} from "../../store/reducers/PlayerSlice";
import PlayerTimeControl from "../PlayerTimeControl/PlayerTimeControl";



let audio:any;
export default function Player() {
    const {pause, activeTrack, volume, currentTime, indexTrack, activeAlbum, duration} = useAppSelector((state) => state.playerReducer)
    const dispatch = useAppDispatch()



    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            dispatch(playTrack())
            audio.play()
        }
    }, [activeTrack])

    useEffect(() => {
        if(pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [pause])

    useEffect(() => {
        audio.addEventListener('ended', () => {
            if(activeAlbum) {
                dispatch(nextTrack())
                dispatch(setActiveTrack(activeAlbum.tracks[indexTrack+1]))
                dispatch(setCurrentTime(1))
            }

        });

        return () => {
            audio.removeEventListener('ended',  () => {
                alert("end")
            });
        };
    }, [activeAlbum]);

    const setAudio = () => {
        if(activeTrack) {
            audio.src = 'http://localhost:8000/' + activeTrack.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                dispatch(setDuration(Math.ceil(audio.duration)))
            }
            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
            }
        }

    }

    const play = () => {
        if(pause) {
            dispatch(playTrack())
            audio.play()
        } else {
            dispatch(pauseTrack())
            audio.pause()
        }
    }

    if(!activeTrack) {
        return null
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        dispatch(setCurrentTime(Number(e.target.value)))

    }

    const setNextTrack = () => {
        if(activeAlbum)
        {
            dispatch(nextTrack())
            dispatch(setActiveTrack(activeAlbum.tracks[indexTrack+1]))
        }
    }

    const setPrevTrack = () => {
        if(activeAlbum)
        {
            dispatch(prevTrack())
            dispatch(setActiveTrack(activeAlbum.tracks[indexTrack-1]))
        }
    }

    return (
        <div className="player">
                <div className="player-title">
                    <div style={
                        {
                            backgroundImage: `url(http://localhost:8000/${activeTrack.picture})`,
                            height: 30,
                            width: 30,
                            backgroundSize: "cover",
                         }}
                    >
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                        <div style={{fontSize:10 ,color: 'white'}}>
                            {activeTrack.name}
                        </div>
                        <div style={{fontSize: 8, color: 'Grey'}}>
                            {activeTrack.artist}
                        </div>
                    </div>
                </div>
                <PlayerTimeControl
                    setPrevTrack={setPrevTrack}
                    setNextTrack={setNextTrack}
                    pause={pause}
                    play={play}
                    left={duration}
                    right={currentTime}
                    changeCurrentTime={changeCurrentTime}
                />
                <div className="player-volume">
                    <img
                        src="https://static.wikia.nocookie.net/naruto/images/5/53/Itachi_Using_Genjutsu.png/revision/latest?cb=20200325003853&path-prefix=ru"
                        alt=""
                    />
                </div>  
            </div>
    );
}
