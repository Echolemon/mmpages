import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Container,
} from "@material-ui/core";
import { get, post } from "src/utils/http";
import { useParams, Navigate } from "react-router-dom";
import AboutUsTitle from "src/components/admin/editAboutUs/AboutUsTitle";
import AboutUsDescription from "src/components/admin/editAboutUs/AboutUsDescription";
import MediaUploader from "src/components/admin/MediaUploader";
import { handleS3Uploads } from "src/components/admin/amazonS3/Upload";
import { handleS3Deletes } from "src/components/admin/amazonS3/Delete";
import Loading from "src/components/Loading";

const EditAboutUs = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [about, setAbout] = useState();
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);

  
  const loadAboutUs = () => {
    get("about/" + id).then((res) => {
      console.log(res.data.message);
      setAbout(res.data.message);
      setLoading(false);
    });
  };

  const handleBackBtn = () => {
    setRedirect(true);
  };

  const appendMedia = (s3Images, s3Videos, s3Audios) => {
    for (var element of s3Images) {
      about.images.push(element);
    }
    for (element of s3Videos) {
      about.videos.push(element);
    }
    for (element of s3Audios) {
      about.audios.push(element);
    }
  };

  const saveAbout = async () => {
    console.log(about);
    setSubmitting(true);

    let s3Images = await handleS3Uploads(imageFiles);
    let s3Videos = await handleS3Uploads(videoFiles);
    let s3Audios = await handleS3Uploads(audioFiles);

    await handleS3Deletes(deletedFiles);

    appendMedia(s3Images, s3Videos, s3Audios);

    post("admin/about", about).then((res) => {
      if (res.status === 200) {
        console.log("success");
        // alert('success');
        setRedirect(true);
        setSubmitting(false);
      } else {
        console.log("An error has occured");
        console.log(res);
        alert("An error has occured");
        setSubmitting(false);
      }
    });
  };

  const onImageFileChange = (files) => {
    setImageFiles(files);
  };

  const onVideoFileChange = (files) => {
    setVideoFiles(files);
  };

  const onAudioFileChange = (files) => {
    setAudioFiles(files);
  };

  const onFileDelete = (file) => {
    setDeletedFiles((prevDeletedFiles) => {
      return prevDeletedFiles.concat(file);
    });
  };

  const onImageDelete = (image) => {
    onFileDelete(image);
    const newImageFiles = imageFiles.filter((item) => item.name !== image.name);
    setImageFiles(newImageFiles);
    about.images = about.images.filter((item) => item.key !== image.key);
  };

  const onVideoDelete = (video) => {
    onFileDelete(video);
    const newVideoFiles = videoFiles.filter((item) => item.name !== video.name);
    setVideoFiles(newVideoFiles);
    about.videos = about.videos.filter((item) => item.key !== video.key);
  };

  const onAudioDelete = (audio) => {
    onFileDelete(audio);
    const newAudioFiles = audioFiles.filter((item) => item.name !== audio.name);
    setAudioFiles(newAudioFiles);
    about.audios = about.audios.filter((item) => item.key !== audio.key);
  };

  useEffect(() => {
    loadAboutUs();
  }, []);

  if (redirect) {
    return <Navigate to="/admin/manageAboutUs" />;
  }

  if (loading) {
    return <Loading />;
  }
  

  return (
    <>
      <Helmet>
        <title>{"Edit About Us (" + about.category + ")"}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Button
            style={{ float: "left" }}
            color="secondary"
            variant="contained"
            onClick={handleBackBtn}
          >
            Back
          </Button>
          <Button
            disabled={submitting}
            style={{ float: "right" }}
            color="primary"
            variant="contained"
            onClick={saveAbout}
          >
            Save
          </Button>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Card>
                <CardHeader title={"Edit About Us (" + about.category + ")"} />
                <CardContent>
                  <AboutUsTitle about={about} />
                </CardContent>
                <CardContent>
                  <AboutUsDescription about={about} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card>
                <MediaUploader
                  resource={about}
                  onImageFileChange={onImageFileChange}
                  onVideoFileChange={onVideoFileChange}
                  onAudioFileChange={onAudioFileChange}
                  onImageDelete={onImageDelete}
                  onVideoDelete={onVideoDelete}
                  onAudioDelete={onAudioDelete}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default EditAboutUs;
