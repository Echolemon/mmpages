import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { get } from "src/utils/http";
import { Box, Container, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import CardActionArea from "@material-ui/core/CardActionArea";
import "react-image-gallery/styles/css/image-gallery.css";
import VideoCard from "src/components/publicFacing/AnimationList/VideoCard";
import Loading from "src/components/Loading";
import MainBanner from "src/components/publicFacing/layout/MainBanner";

const AnimationGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [curPageVideos, setCurPageVideos] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const videoLimit = 10;

  const loadVideos = () => {
    get("media").then((res) => {
      res.data.message.sort(function (a, b) {
        return a.orderIndex - b.orderIndex;
      });
      setVideos(res.data.message);
      setLoading(false);
      console.log(res.data.message);

      setCurPageVideos(res.data.message.slice(0, videoLimit));
      setMaxPage(Math.ceil(res.data.message.length / videoLimit));
      setLoading(false);
    });
  };

  const handlePageChange = (event, value) => {
    setCurPage(value);
    setCurPageVideos(
      videos.slice((value - 1) * videoLimit, value * videoLimit)
    );
    console.log(curPageVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Animation List</title>
      </Helmet>
      <MainBanner
        title={"Animations"}
        imageSrc={"/static/images/missing_header.png"}
      />
      <Box>
        {curPageVideos.map((video) => (
          <Box sx={{ mt: 3 }}>
            <VideoCard key={video.s3.key} video={video} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3,
        }}
      >
        <Pagination
          color="primary"
          hidePrevButton
          hideNextButton
          count={maxPage}
          page={curPage}
          size="large"
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default AnimationGrid;
