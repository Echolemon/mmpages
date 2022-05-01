import React from "react";
import { Box, Card, CardContent, Paper, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import "src/styles/react-player.css";

const VideoDetail = ({ video }) => {
  if (!video) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="player-wrapper">
          <ReactPlayer
            url={video.s3.location}
            className="react-player"
            width="100%"
            height="100%"
            controls={true}
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
          <Box sx={{ marginBottom: 20 }}>
            <Typography variant="h2">{video.title}</Typography>
          </Box>
          <Typography
            variant="h5"
            style={{
              marginTop: "20px",
            }}
            style={{ whiteSpace: "pre-line" }}
          >
            {video.description}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default VideoDetail;
