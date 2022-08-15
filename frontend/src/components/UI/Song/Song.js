import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import classes from "./Song.module.css";

const Song = (props) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.song} >
        <CardMedia
          component="img"
          alt="the song picture"
          height="140"
          image={props.Image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {props.Genre}
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: "center"}}>
          <Button className="button" size="small" variant="outlined" onClick={(event) => {
            window.open(props.Link)
          }}>Link To Song</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Song;
