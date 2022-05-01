import React, { useState, useEffect } from "react";
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
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { get, post } from "../../../utils/http";
import { handleS3Uploads } from "../amazonS3/Upload";
import { handleS3Deletes } from "../amazonS3/Delete";
import { useSnackbar } from "notistack";

export default function SubmitStoryModal(props) {
  const [active, setActive] = useState(props.active);
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const appendMedia = (s3Images, s3Videos, s3Audios) => {
    for (var element of s3Images) {
      props.story.images.push(element);
    }
    for (element of s3Videos) {
      props.story.videos.push(element);
    }
    for (element of s3Audios) {
      props.story.audios.push(element);
    }
  };

  const submitStory = async () => {
    setSubmitting(true);

    let s3Images = await handleS3Uploads(props.imageFiles);
    let s3Videos = await handleS3Uploads(props.videoFiles);
    let s3Audios = await handleS3Uploads(props.audioFiles);

    await handleS3Deletes(props.deletedFiles);

    console.log(props.story.images);

    appendMedia(s3Images, s3Videos, s3Audios);

    var JsonBody = {
      id: props.story.id,
      briefDescription: props.story.briefDescription,
      detailedDescription: props.story.detailedDescription,
      familyName: props.story.familyName,
      familyMembers: props.story.familyMembers,
      address: props.story.address,
      images: props.story.images,
      videos: props.story.videos,
      audios: props.story.audios,
      link: props.story.link,
    };
    var path;
    if (props.resourceType == "Flowers") {
      JsonBody.flowerType = props.story.flowerType;
      path = "flower";
    } else if (props.resourceType == "Mezzuzot") {
      path = "mm";
    }
    post(`admin/${path}`, JsonBody).then((res) => {
      if (res.status === 200) {
        console.log("success");
        props.setRedirect(true);
        enqueueSnackbar("Succesfully Updated", { variant: `success` });
      } else {
        console.log("An error has occured");
        console.log(res);
      }
    });

    setSubmitting(false);
  };

  return (
    <Dialog
      open={active}
      onClose={props.onHide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Submit and update the Website?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The information you changed will update the{" "}
          {props.resourceType.toLowerCase()} page!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onHide} color="primary">
          Cancel
        </Button>
        <Button onClick={submitStory} disabled={submitting} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
