/* Code learned from  https://github.com/adrianhajdin/project_youtube_video_player
 */

import React from "react";
import { Grid, List } from "@material-ui/core";

import VideoItem from "./VideoItem";

const VideoList = ({ videos, onVideoSelect }) => {
  const listOfVideos = videos.map((video) => (
    <VideoItem onVideoSelect={onVideoSelect} key={video.s3.key} video={video} />
  ));

  return (
    <List
      style={{
        maxHeight: "800px",
        overflow: "auto",
        paddingTop: 2,
        paddingLeft: 2,
        marginTop: 6,
        marginBottom: "100px",
      }}
    >
      <Grid container item xs={12} spacing={3}>
        {listOfVideos}
      </Grid>
    </List>
  );
};

export default VideoList;
