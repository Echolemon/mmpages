import PropTypes from "prop-types";
import {
  Avatar,
  Alert,
  Dialog,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Button,
  Typography,
  TextField,
  Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { any } from "prop-types";

import AnimationDeletion from "src/components/admin/animations/AnimationDeletion";
import AnimationEdition from "src/components/admin/animations/AnimationEdition";

const AnimationCard = ({ animations, animation, setAnimations, ...rest }) => {
  // Video
  const [openVideo, setOpenVideo] = useState(false);
  const [video, setVideo] = useState("");

  function openVideoDialog(a) {
    setVideo(a);
    setOpenVideo(true);
  }

  const handleVideoClose = () => {
    setOpenVideo(false);
  };

  // Edition
  const [openEdition, setEditionOpen] = useState(false);

  const handleEditionOpen = () => {
    setEditionOpen(true);
  };

  // Deletion
  const [openDeletion, setDeletionOpen] = React.useState(false);

  const handleDeletionOpen = () => {
    setDeletionOpen(true);
  };

  return (
    <>
      <AnimationDeletion
        openDeletion={openDeletion}
        setDeletionOpen={setDeletionOpen}
        animation={animation}
        animations={animations}
        setAnimations={setAnimations}
      />
      <AnimationEdition
        openEdition={openEdition}
        setEditionOpen={setEditionOpen}
        animation={animation}
      />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        {...rest}
      >
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={1} align="center">
              <CardMedia
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "50%",
                }}
                src={"/static/images/movie-fill.svg"}
                component="img"
                onClick={() => openVideoDialog(animation)}
              ></CardMedia>
            </Grid>
            <Grid item xs={12} md={9} margin="auto">
              <Typography variant="h5" component="h1" noWrap>
                {animation.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2} margin="auto" align="center">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleEditionOpen}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={handleDeletionOpen}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={openVideo}
        onClose={handleVideoClose}
        aria-labelledby="viedo-dialog-title"
        aria-describedby="viedo-dialog-description"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle>{animation.title}</DialogTitle>
        <DialogContent>
          <div className="player-wrapper">
            <ReactPlayer
              url={animation.s3.location}
              className="react-player"
              playing
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVideoClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AnimationCard.propTypes = {
  animation: PropTypes.object.isRequired,
};

export default AnimationCard;
