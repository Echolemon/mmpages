import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { get } from "src/utils/http";
import { Grid, Typography, Box } from "@material-ui/core";

import "react-image-gallery/styles/css/image-gallery.css";
import VideoList from "src/components/publicFacing/AnimationList/VideoList";
import VideoDetail from "src/components/publicFacing/AnimationList/VideoDetail";
import { stubFalse } from "lodash-es";

const AnimationList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const { id } = useParams();

  const loadVideos = () => {
    get("media").then((res) => {
      res.data.message.sort(function (a, b) {
        return a.orderIndex - b.orderIndex;
      });
      setVideos(res.data.message);
      setLoading(false);
      console.log(res.data.message);
    });
  };

  const loadVideo = () => {
    get("media/" + id).then((res) => {
      setSelectedVideo(res.data.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadVideos();
    loadVideo();
  }, []);

  return (
    <>
      <Helmet>
        <title>Animation List</title>
      </Helmet>
      <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container item spacing={3} md={11}>
          <Grid item lg={8} md={8} xs={12}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item lg={4} md={4} xs={10}>
            <Typography variant="h4">More Animations</Typography>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AnimationList;
