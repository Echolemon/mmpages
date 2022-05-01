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
import { handleS3Deletes } from "../amazonS3/Delete";
import { useSnackbar } from "notistack";

export default function DeleteStoryModal(props) {
  const [active, setActive] = useState(props.active);
  const [deleting, setDeleting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const deleteStory = async () => {
    setDeleting(true);

    var JsonBody = {
      id: props.story.id,
    };

    let deletedFiles = props.story.images.concat(
      props.story.videos.concat(props.story.audios)
    );

    await handleS3Deletes(deletedFiles);
    var path;
    if (props.resourceType == "Flowers") {
      path = "flower";
    } else if (props.resourceType == "Mezzuzot") {
      path = "mm";
    }
    post(`admin/${path}/delete`, JsonBody).then((res) => {
      if (res.status === 200) {
        console.log("success");
        props.setRedirect(true);
        enqueueSnackbar("Successfully Deleted", { variant: `success` });
      } else {
        console.log("An error has occured");
        console.log(res);
      }
    });

    setDeleting(false);
  };

  return (
    <Dialog
      open={active}
      onClose={props.onHide}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Flower Story?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {props.story.familyName}'s{" "}
          {props.resourceTypeSingular.toLowerCase()} story?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onHide} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteStory} disabled={deleting} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
