/* Code learned from https://github.com/adrianhajdin/project_youtube_video_player */

import React from "react";
import ReactPlayer from "react-player";
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  CardActionArea,
} from "@material-ui/core";

const VideoCard = ({ video }) => {
  return (
    <Card>
      <CardActionArea component="a" href={"animations/" + video.id}>
        <Grid container justified="center">
          <Grid item sm={2} xs={12}>
            <div className="player-wrapper">
              <ReactPlayer
                url={video.s3.location}
                className="react-player"
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      poster: "/static/images/movie-fill.svg",
                    },
                  },
                }}
              />
            </div>
          </Grid>
          <Grid item sm={1} xs={false}></Grid>
          <Grid container item sm={9} xs={12} alignItems="center">
            <Grid item sm={5} xs={12}>
              <CardContent>
                <Typography variant="h4">
                  <b>{video.title}</b>
                </Typography>
              </CardContent>
            </Grid>
            <Grid item sm={4} xs={12}>
              <CardContent>
                <Typography variant="subtitle1">{video.description}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
