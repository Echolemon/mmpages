/* Code learned from https://github.com/adrianhajdin/project_youtube_video_player */

import React from "react";
import ReactPlayer from "react-player";
import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        onClick={() => onVideoSelect(video)}
      >
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

        <CardContent>
          <Typography variant="subtitle1">
            <b>{video.title}</b>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VideoItem;
