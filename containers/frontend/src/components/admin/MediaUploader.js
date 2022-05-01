import {
  Box,
  Button,
  Card,
  Avatar,
  Dialog,
  CardContent,
  Divider,
  CardHeader,
  Fab,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactPlayer from "react-player";

export default function MediaUploader(props) {
  const [openAddNewImage, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [audio, setAudio] = useState("");
  const [imagesList, setImagesList] = useState(props.resource.images);
  const [videoList, setVideoList] = useState(props.resource.videos);
  const [audioList, setAudioList] = useState(props.resource.audios);

  function openImageDialog(a) {
    setPicture(a);
    setOpenPreview(true);
  }

  function openVideoDialog(a) {
    setVideo(a);
    setOpenVideo(true);
  }

  function openAudioDialog(a) {
    setAudio(a);
    setOpenAudio(true);
  }

  const handleClose = () => {
    setOpenPreview(false);
  };

  const handleVideoClose = () => {
    setOpenVideo(false);
  };

  const handleAudioClose = () => {
    setOpenAudio(false);
  };

  const handleImageDelete = () => {
    setOpenPreview(false);
    props.onImageDelete(picture);
    setImagesList((prevImagesList) => {
      return prevImagesList.filter((item) => item.key !== picture.key);
    });
  };

  const handleVideoDelete = () => {
    setOpenVideo(false);
    props.onVideoDelete(video);
    setVideoList((prevVideoList) => {
      return prevVideoList.filter((item) => item.key !== video.key);
    });
  };

  const handleAudioDelete = () => {
    setOpenAudio(false);
    props.onAudioDelete(audio);
    console.log(audio);
    console.log(audioList);
    setAudioList((prevAudioList) => {
      return prevAudioList.filter((item) => item.key !== audio.key);
    });
  };

  const handleImageChange = (event) => {
    props.onImageFileChange(event.target.files);
    setImagesList((prevImagesList) => {
      return prevImagesList.concat(
        Array.from(event.target.files).map((item) => ({
          name: item.name,
          key: URL.createObjectURL(item),
          location: URL.createObjectURL(item),
        }))
      );
    });
  };

  const handleVideoChange = (event) => {
    props.onVideoFileChange(event.target.files);
    setVideoList((prevVideoList) => {
      return prevVideoList.concat(
        Array.from(event.target.files).map((item) => ({
          name: item.name,
          key: URL.createObjectURL(item),
          location: URL.createObjectURL(item),
        }))
      );
    });
  };

  const handleAudioChange = (event) => {
    props.onAudioFileChange(event.target.files);
    setAudioList((prevAudioList) => {
      return prevAudioList.concat(
        Array.from(event.target.files).map((item) => ({
          name: item.name,
          key: URL.createObjectURL(item),
          location: URL.createObjectURL(item),
        }))
      );
    });
  };
  return (
    <>
      <Card {...props}>
        <CardHeader title="Media" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={3}>
              <Grid item md={12}>
                <div style={{ fontSize: 14, fontFamily: "Open Sans" }}>
                  Pictures
                </div>
              </Grid>
              <Grid item container spacing={1}>
                {imagesList
                  ? imagesList.map((image) => (
                      <Grid item md={2} key={image.key}>
                        <Avatar
                          src={image.location}
                          variant="square"
                          onClick={() => openImageDialog(image)}
                          sx={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </Grid>
                    ))
                  : ""}
                <Grid item md={1}>
                  <label>
                    <input
                      style={{ display: "none" }}
                      accept="image/*"
                      multiple
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={(e) => handleImageChange(e)}
                    />
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                  </label>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <div style={{ fontSize: 14, fontFamily: "Open Sans" }}>
                  Videos
                </div>
              </Grid>

              <Grid item container spacing={1}>
                {videoList
                  ? videoList.map((video) => (
                      <Grid item md={2} key={video.key}>
                        <Avatar
                          src={"/static/images/video.png"}
                          variant="square"
                          onClick={() => openVideoDialog(video)}
                          sx={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </Grid>
                    ))
                  : ""}
                <Grid item md={1}>
                  <label>
                    <input
                      style={{ display: "none" }}
                      accept="video/*"
                      multiple
                      id="upload-video"
                      name="upload-video"
                      type="file"
                      onChange={(e) => handleVideoChange(e)}
                    />
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                  </label>
                </Grid>
              </Grid>

              <Grid item md={12}>
                <div style={{ fontSize: 14, fontFamily: "Open Sans" }}>
                  Audios
                </div>
              </Grid>
              <Grid item container spacing={1}>
                {audioList
                  ? audioList.map((audio) => (
                      <Grid item md={2} key={audio.key}>
                        <Avatar
                          src={"/static/images/audio.png"}
                          variant="square"
                          onClick={() => openAudioDialog(audio)}
                          sx={{
                            height: 50,
                            width: 50,
                          }}
                        />
                      </Grid>
                    ))
                  : ""}
                <Grid item md={1}>
                  <label>
                    <input
                      style={{ display: "none" }}
                      accept="audio/*"
                      multiple
                      id="upload-audio"
                      name="upload-audio"
                      type="file"
                      onChange={(e) => handleAudioChange(e)}
                    />
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                  </label>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      {/* dialog for image preview */}
      <Dialog
        open={openPreview}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{picture.caption}</DialogTitle>
        <DialogContent>
          <Avatar
            src={picture.location}
            variant="square"
            style={{
              minHeight: 500,
              minWidth: 500,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for video preview */}
      <Dialog
        open={openVideo}
        onClose={handleVideoClose}
        aria-labelledby="viedo-dialog-title"
        aria-describedby="viedo-dialog-description"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle>{video.caption}</DialogTitle>
        <DialogContent>
          <div className="player-wrapper">
            <ReactPlayer
              url={video.location}
              className="react-player"
              playing
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVideoDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog for audio preview */}
      <Dialog
        open={openAudio}
        onClose={handleAudioClose}
        aria-labelledby="audio-dialog-title"
        aria-describedby="audio-dialog-description"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle>{audio.caption}</DialogTitle>
        <DialogContent>
          <audio controls src={audio.location} key={audio.key} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAudioDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
