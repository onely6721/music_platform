import React from 'react';
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "./index.css"

interface PlayerTimeControlProps  {
    left: number,
    right: number,
    play: () => void,
    pause: boolean,
    changeCurrentTime: (e:any) => void,
    setPrevTrack: () => void,
    setNextTrack: () => void,

}

const PlayerTimeControl:React.FC<PlayerTimeControlProps> = ({
                                                                left,
                                                                right,
                                                                pause,
                                                                play,
                                                                changeCurrentTime,
                                                                setPrevTrack,
                                                                setNextTrack
                                                            }) => {
    return (

            <div className="player-control">
                <div style={{textAlign:"center"}}>
                    <IconButton onClick={setPrevTrack}>
                        <SkipPreviousIcon style={{color:"white"}}  />
                    </IconButton>
                    <IconButton onClick={play} style={{color:"white"}}>
                        {pause
                            ? <PlayArrowIcon/>
                            : <PauseIcon/>
                        }
                    </IconButton>
                    <IconButton onClick={setNextTrack}>
                        <SkipNextIcon style={{color:"white"}}/>
                    </IconButton>
                </div>
                <div
                    style={{
                        fontSize: 12,
                        color: 'Grey',
                        textAlign:"center"
                    }}
                >
                    {right}
                    <input
                        type="range"
                        min={0}
                        max={left}
                        value={right}
                        onChange={changeCurrentTime}
                    />
                    {left}
                </div>
            </div>
    );
};

export default PlayerTimeControl;