import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import {
  Box,
  Button,
  Container,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  Card,
  Divider,
  Avatar,
  Dialog,
} from "@material-ui/core";
import StoryInfo from "src/components/admin/addEditStory/StoryInfo.js";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import { useParams, Navigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { get, post } from "src/utils/http";
import { dom } from "aria-query";
import DeleteStoryModal from "src/components/admin/addEditStory/DeleteStoryModal";
import SubmitStoryModal from "src/components/admin/addEditStory/SubmitStoryModal";
import QRCodeContainer from "src/components/admin/addEditStory/QRCodeContainer";
import MediaUploader from "src/components/admin/MediaUploader";
import Loading from "src/components/Loading";

export default function AddEditStory(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [showDeleteStoryModal, setShowDeleteStoryModal] = useState(false);
  const [showSubmitStoryModal, setShowSubmitStoryModal] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [resourceTypeSingular, setResourceTypeSingular] = useState();

  const setShowDeleteStoryModalActive = () => {
    setShowDeleteStoryModal(true);
  };

  const setHideShowDeleteStoryModalActive = () => {
    setShowDeleteStoryModal(false);
  };

  const setShowSubmitStoryModalActive = () => {
    setShowSubmitStoryModal(true);
  };

  const setHideShowSubmitStoryModalActive = () => {
    setShowSubmitStoryModal(false);
  };

  const loadData = (path) => {
    get(`${path}/${id}`).then((res) => {
      setStory(res.data.message);
      setLoading(false);
    });
  };

  const handleImageFileChange = (files) => {
    setImageFiles((prevImageFiles) => {
      return prevImageFiles.concat(Array.from(files));
    });
  };

  const handleVideoFileChange = (files) => {
    setVideoFiles((prevVideoFiles) => {
      return prevVideoFiles.concat(Array.from(files));
    });
  };

  const handleAudioFileChange = (files) => {
    setAudioFiles((prevAudioFiles) => {
      return prevAudioFiles.concat(Array.from(files));
    });
  };

  const handleFileDelete = (file) => {
    setDeletedFiles((prevDeletedFiles) => {
      return prevDeletedFiles.concat(file);
    });
  };

  const handleImageDelete = (image) => {
    handleFileDelete(image);
    const newImageFiles = imageFiles.filter((item) => item.name !== image.name); // May want to refactor to make this more of a unique identifier.
    setImageFiles(newImageFiles);
    story.images = story.images.filter((item) => item.key !== image.key);
  };

  const handleVideoDelete = (video) => {
    handleFileDelete(video);
    const newVideoFiles = videoFiles.filter((item) => item.name !== video.name); // May want to refactor to make this more of a unique identifier.
    setVideoFiles(newVideoFiles);
    story.videos = story.videos.filter((item) => item.key !== video.key);
  };

  const handleAudioDelete = (audio) => {
    handleFileDelete(audio);
    const newAudioFiles = audioFiles.filter((item) => item.name !== audio.name); // May want to refactor to make this more of a unique identifier.
    setAudioFiles(newAudioFiles);
    story.audios = story.audios.filter((item) => item.key !== audio.key);
  };

  const handleBackBtn = () => {
    setRedirect(true);
  };

  useEffect(() => {
    if (props.resourceType == "Flowers") {
      setResourceTypeSingular("Flower");
      if (id) {
        loadData("flower");
      } else {
        let newFlower = {
          familyName: "",
          flowerType: "1",
          familyMembers: "",
          address: "",
          briefDescription: "",
          detailedDescription: "",
          images: [],
          videos: [],
          audios: [],
        };

        setStory(newFlower);
        setLoading(false);
      }
    } else if (props.resourceType == "Mezzuzot") {
      setResourceTypeSingular("Mezzuzah");
      if (id) {
        loadData("mm");
      } else {
        let newMezzuzah = {
          familyName: "",
          familyMembers: "",
          address: "",
          briefDescription: "",
          detailedDescription: "",
          images: [],
          videos: [],
          audios: [],
        };

        setStory(newMezzuzah);
        setLoading(false);
      }
    }
  }, []);

  if (redirect) {
    return <Navigate to={`/admin/${props.resourceType.toLowerCase()}`} />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>
          {id ? "Edit" : "New"} {resourceTypeSingular}
        </title>
      </Helmet>
      <Container maxWidth="lg">
        <Button
          style={{ float: "left" }}
          color="secondary"
          variant="contained"
          onClick={handleBackBtn}
        >
          Back
        </Button>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <StoryInfo
              story={story}
              resourceTypeSingular={resourceTypeSingular}
              resourceType={props.resourceType}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MediaUploader
              resource={story}
              onImageFileChange={handleImageFileChange}
              onVideoFileChange={handleVideoFileChange}
              onAudioFileChange={handleAudioFileChange}
              onImageDelete={handleImageDelete}
              onVideoDelete={handleVideoDelete}
              onAudioDelete={handleAudioDelete}
            />
            {story.id ? (
              <QRCodeContainer
                story={story}
                resourceType={props.resourceType}
              />
            ) : null}
          </Grid>
        </Grid>
        <Grid>
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={setShowSubmitStoryModalActive}
            >
              {id ? "Update" : "Create"} {resourceTypeSingular} Story
            </Button>
          </Box>
          {id ? (
            <Box>
              <Button
                color="secondary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={setShowDeleteStoryModalActive}
              >
                Delete {resourceTypeSingular} Story
              </Button>
            </Box>
          ) : null}
        </Grid>
      </Container>
      {showSubmitStoryModal ? (
        <SubmitStoryModal
          resourceType={props.resourceType}
          story={story}
          imageFiles={imageFiles}
          videoFiles={videoFiles}
          audioFiles={audioFiles}
          deletedFiles={deletedFiles}
          onHide={setHideShowSubmitStoryModalActive}
          active={showSubmitStoryModal}
          setRedirect={setRedirect}
        />
      ) : null}
      {showDeleteStoryModal ? (
        <DeleteStoryModal
          resourceType={props.resourceType}
          resourceTypeSingular={resourceTypeSingular}
          story={story}
          onHide={setHideShowDeleteStoryModalActive}
          active={showDeleteStoryModal}
          setRedirect={setRedirect}
        />
      ) : null}
    </>
  );
}
