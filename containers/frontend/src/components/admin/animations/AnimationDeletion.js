import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Modal,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/WarningOutlined";
import React from "react";
import { post, get } from "../../../utils/http";
import { handleS3Deletes } from "../amazonS3/Delete";

const AnimationDeletion = ({
  openDeletion,
  setDeletionOpen,
  animation,
  animations,
  setAnimations,
}) => {
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleDeletionClose = () => {
    setDeletionOpen(false);
  };

  const handleDeletion = async () => {
    console.log(animation);
    await handleS3Deletes([animation.s3]);
    var JsonBody = {
      id: animation.id,
    };

    post("admin/media/delete", JsonBody).then((res) => {
      if ((res.status = 200)) {
        console.log("success");
      } else {
        console.log("An error has occurred");
        console.log(res);
      }
    });

    timer.current = window.setTimeout(() => {
      get("media").then((res) => {
        res.data.message.sort(function (a, b) {
          return a.orderIndex - b.orderIndex;
        });
        setAnimations(res.data.message);
        console.log(res.data.message);
      });
      setDeletionOpen(false);
    }, 1000);
  };

  return (
    <Modal open={openDeletion}>
      <Box
        sx={{
          minHeight: "100%",
          p: 3,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={12}>
            <Grid
              container
              style={{
                padding: "30px",
                paddingLeft: "0px",
              }}
            >
              <Grid item container>
                <Grid item container justifyContent="center" xs={2}>
                  <Avatar
                    style={{
                      backgroundColor: "pink",
                      color: "red",
                      mr: 2,
                    }}
                  >
                    <WarningIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    color="textPrimary"
                    variant="h3"
                    style={{
                      paddingBottom: "20px",
                    }}
                  >
                    Delete Animation
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Are you sure you want to delete this animation? All relevant
                    data will be permanently removed. This action cannot be
                    undone.
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={3}
                style={{
                  paddingTop: "25px",
                }}
                justifyContent="flex-end"
              >
                <Grid item>
                  <Button
                    color="primary"
                    sx={{ mr: 2 }}
                    variant="outlined"
                    onClick={handleDeletionClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleDeletion}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Modal>
  );
};

export default AnimationDeletion;
