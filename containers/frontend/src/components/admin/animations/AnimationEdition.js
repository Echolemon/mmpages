import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Modal,
} from "@material-ui/core";
import React from "react";
import { post } from "src/utils/http";

const AnimationEdition = ({ openEdition, setEditionOpen, animation }) => {
  const oldTitle = animation.title;
  const oldDescription = animation.description;
  const onTitleChange = (newValue) => {
    animation.title = newValue;
  };

  const onDescriptionChange = (newValue) => {
    animation.description = newValue;
  };

  const resetAll = () => {
    animation.title = oldTitle;
    animation.description = oldDescription;
    setEditionOpen(false);
  };

  const handleEdition = () => {
    post("admin/media", animation).then((res) => {
      if ((res.status = 200)) {
        console.log("success");
        setEditionOpen(false);
      } else {
        console.log("An error has occured");
        console.log(res);
      }
    });
  };

  return (
    <Modal open={openEdition}>
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
          <CardHeader title={"Update the animation's information:"} />
          <Divider />

          <Grid
            container
            style={{
              display: "flex",
              padding: 20,
              flexDirection: "column",
            }}
          >
            <Grid item xs={12}>
              <form
                onSubmit={(event) => event.preventDefault()}
                noValidate
                autoComplete="off"
              >
                <TextField
                  fullWidth
                  label="Animation Title"
                  id="Animation Title"
                  defaultValue={animation.title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  variant="outlined"
                  multiline
                  maxRows={Infinity}
                />

                <TextField
                  fullWidth
                  label="Animation Description"
                  id="Animation Description"
                  defaultValue={animation.description}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  variant="outlined"
                  multiline
                  maxRows={Infinity}
                  style={{
                    marginTop: 20,
                  }}
                />

                <Divider
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                />
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    autoFocus
                    onClick={resetAll}
                    color="primary"
                    variant="text"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEdition}
                    color="primary"
                    sx={{ ml: 1 }}
                    type="submit"
                    variant="contained"
                  >
                    Confirm
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Modal>
  );
};

export default AnimationEdition;
