import React from "react";
import Song from "./Song";
import songim from './songim';
import { Grid } from "@mui/material";

const DisplaySongs = () => {
    return (<div>
        <Grid container>
        {songim.map((song) => {
        return(
            <Song
            key={song.key}
            Image={song.Image}
            Name={song.Name}
            Genre={song.Genre}
            Link={song.Link}
            />
        )
    })}
    </Grid>
    </div>)

};

export default DisplaySongs;