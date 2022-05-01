import {
  Box,
  Button,
  Card,
  CardMedia,
  CardHeader,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  TextField,
  Typography,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { post, get } from "../../../utils/http";
import React, { useState, useEffect } from "react";
import { handleS3Uploads } from "../amazonS3/Upload";
import ReactPlayer from "react-player";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";

const AnimationCreation = ({
  openAdd,
  setAddOpen,
  animations,
  setAnimations,
}) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [videoFile, setVideoFile] = useState([]);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = React.useRef();

  const [uploadVideoFinish, setUploadVideoFinish] = useState(false);
  const [uploadFinish, setUploadFinish] = useState(false);

  let showIcon = videoFile.length != 0 ? true : false;
  const [videoSize, setVideoSize] = useState(0);
  const [speedBps, setSpeedBps] = useState(0);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((progressValue) => {
          let threshold = 100;

          var speed = 100000000;
          if (speedBps != 0) speed = speedBps * 5;

          const diff = ((Math.random() * 1) / videoSize) * speed;
          //console.log(speed);

          if (!uploadVideoFinish && progressValue < threshold) {
            progressValue += diff;
            //console.log("1: " + progressValue);
          } else if (uploadVideoFinish && progressValue < threshold) {
            progressValue = threshold;
            //console.log("2: " + progressValue);
          } else if (progressValue == threshold) {
            //console.log("It's about to end");
            clearTimeout(timer.current);
            clearInterval(timer);
          }

          return Math.min(progressValue, 100);
        });
      }, 500);
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading, uploadVideoFinish]);

  function openVideoDialog(a) {
    setOpenVideo(true);
  }

  const handleVideoClose = () => {
    setOpenVideo(false);
  };

  const handleAddClose = () => {
    setTitle(null);
    setDescription(null);
    setVideoFile([]);
    setVideoFilePath(null);
    setAddOpen(false);
    showIcon = false;
    setProgress(0);
    setUploadVideoFinish(false);
  };

  const handleDelete = () => {
    setTitle(null);
    setDescription(null);
    setVideoFile([]);
    setVideoFilePath(null);
  };

  const onVideoFileChange = (file) => {
    setVideoFile([]);
    setVideoFile(file.target.files[0]);
    setVideoFilePath(URL.createObjectURL(file.target.files[0]));
    setTitle(file.target.files[0].name);
    setVideoSize(file.target.files[0].size);
    //console.log(file.target.files[0]);

    const items = Array.from(animations);
    if (file.target.value !== null) {
      items.push({
        title: file.target.files[0].name,
        location: URL.createObjectURL(file.target.files[0]),
      });
    }

    InitiateSpeedDetection();
  };

  const onTitleChange = (newValue) => {
    setTitle(newValue);
  };

  const onDescriptionChange = (newValue) => {
    setDescription(newValue);
  };

  const handleCreation = async () => {
    if (!loading) {
      setLoading(true);
      //handleProgress();
    }

    const s3Videos = await handleS3Uploads([videoFile]);
    if (!uploadVideoFinish) setUploadVideoFinish(true);

    //console.log(s3Videos);
    var JsonBody = {
      fileType: "video",
      category: "web animations",
      title: title,
      description: description,
      orderIndex: animations.length,
      s3: {
        bucket: s3Videos[0].bucket,
        key: s3Videos[0].key,
        location: s3Videos[0].location,
      },
    };

    post("admin/media", JsonBody).then((res) => {
      if ((res.status = 200)) {
        console.log("success");
      } else {
        console.log("An error has occurred");
        console.log(res);
      }
    });

    if (!uploadFinish) setUploadFinish(true);

    timer.current = window.setTimeout(() => {
      get("media").then((res) => {
        res.data.message.sort(function (a, b) {
          return a.orderIndex - b.orderIndex;
        });
        setAnimations(res.data.message);
        console.log(res.data.message);
      });
      setLoading(false);
      setVideoFile([]);
      setTitle(null);
      setDescription(null);
      setVideoFilePath(null);
      setAddOpen(false);
      setProgress(0);
      setUploadVideoFinish(false);
      setUploadFinish(false);
    }, 1000);
  };

  const imageAddr = "https://i.imgur.com/pfudboE.jpg";
  const downloadSize = 4281953; //bytes

  function ShowProgressMessage(msg) {
    if (console) {
      if (typeof msg == "string") {
        console.log(msg);
      } else {
        for (var i = 0; i < msg.length; i++) {
          console.log(msg[i]);
        }
      }
    }

    var oProgress = document.getElementById("progress");
    if (oProgress) {
      var actualHTML = typeof msg == "string" ? msg : msg.join("<br />");
      oProgress.innerHTML = actualHTML;
    }
  }

  function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
  }

  if (window.addEventListener) {
    window.addEventListener("load", InitiateSpeedDetection, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", InitiateSpeedDetection);
  }

  function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
      endTime = new Date().getTime();
      showResults();
    };

    download.onerror = function (err, msg) {
      ShowProgressMessage("Invalid image, or error downloading");
    };

    startTime = new Date().getTime();

    var cacheBuster = "?n=" + Math.random();
    download.src = imageAddr + cacheBuster;

    function showResults() {
      var duration = (endTime - startTime) / 1000;
      var bitsLoaded = downloadSize * 8;
      setSpeedBps((bitsLoaded / duration).toFixed(2));
      //console.log("Connect speed is: " + speedBps);
    }
  }

  return (
    <>
      <Modal open={openAdd} onClose={handleAddClose}>
        <Box
          sx={{
            minHeight: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card style={{ minWidth: "50%", maxWidth: 500 }}>
            <CardHeader title={"Add Animation"} />
            <Divider />
            <Grid
              container
              style={{
                display: "flex",
                padding: "10px 20px",
                flexDirection: "column",
              }}
            >
              <Grid item xs={12}>
                <form
                  onSubmit={(event) => event.preventDefault()}
                  noValidate
                  autoComplete="off"
                >
                  <Box sx={{ mt: 2 }}>
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        {!showIcon && (
                          <Button
                            variant="contained"
                            component="label"
                            color="primary"
                          >
                            Upload Animation
                            <input
                              style={{
                                display: "none",
                              }}
                              accept="video/*"
                              multiple
                              id="upload-video"
                              name="upload-video"
                              type="file"
                              onChange={(e) => onVideoFileChange(e)}
                              hidden
                            />
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={1}>
                        {showIcon && (
                          <CardMedia
                            style={{
                              display: "flex",
                              width: "40px",
                            }}
                            src={"/static/images/movie-fill.svg"}
                            component="img"
                            onClick={() => openVideoDialog(videoFile)}
                          ></CardMedia>
                        )}
                      </Grid>
                      {showIcon && (
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            label="Animation Title"
                            id="Animation Title"
                            defaultValue={videoFile.name}
                            onChange={(e) => onTitleChange(e.target.value)}
                            variant="outlined"
                            multiline
                            maxRows={Infinity}
                          />
                        </Grid>
                      )}
                      <Grid item container xs={1} justifyContent="flex-end">
                        {showIcon && (
                          <IconButton
                            onClick={handleDelete}
                            color="secondary"
                            variant="text"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item xs={1}></Grid>
                      {showIcon && (
                        <Grid item xs={10}>
                          <TextField
                            style={{
                              marginTop: "20px",
                            }}
                            fullWidth
                            label="Animation Description"
                            id="Animation Description"
                            onChange={(e) =>
                              onDescriptionChange(e.target.value)
                            }
                            variant="outlined"
                            multiline
                            maxRows={Infinity}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Box>
                  <Divider
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  />
                  <Grid container spacing={3} justifyContent="flex-end">
                    <Grid item>
                      <Box sx={{ flexGrow: 1 }} />
                    </Grid>
                    <Grid item>
                      <Button
                        autoFocus
                        onClick={handleAddClose}
                        color="primary"
                        variant="text"
                      >
                        Cancel
                      </Button>
                    </Grid>
                    {showIcon && (
                      <Grid item>
                        <Box
                          style={{
                            position: "relative",
                          }}
                        >
                          <Button
                            onClick={handleCreation}
                            color="primary"
                            sx={{ ml: 1 }}
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            id="confirm"
                          >
                            Confirm
                          </Button>
                          {loading && (
                            <CircularProgress
                              size={24}
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: -12,
                                marginLeft: -12,
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                  {loading && (
                    <Box
                      sx={{
                        width: "100%",
                        marginTop: 12,
                      }}
                    >
                      <LinearProgress variant="determinate" value={progress} />
                      <h1 id="progress"></h1>
                    </Box>
                  )}
                </form>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Modal>
      <Dialog
        open={openVideo}
        onClose={handleVideoClose}
        aria-labelledby="viedo-dialog-title"
        aria-describedby="viedo-dialog-description"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle>{videoFile.name}</DialogTitle>
        <DialogContent>
          <div className="player-wrapper">
            <ReactPlayer
              url={videoFilePath}
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

export default AnimationCreation;
