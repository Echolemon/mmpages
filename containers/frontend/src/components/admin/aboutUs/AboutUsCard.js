import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  SvgIcon,
  Typography,
  CardActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { get } from "../../../utils/http";

const AboutUsCard = (props) => {
  const [about, setAbout] = useState();

  const loadAboutUs = () => {
    get("about/" + props.category.id).then((res) => {
      setAbout(res.data.message);
    });
  };

  useEffect(() => {
    loadAboutUs();
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {props.category.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography align="left" color="textPrimary" variant="caption text">
          Last Modified:{" "}
          {about
            ? about.updatedAt
              ? new Date(about.updatedAt).toDateString()
              : null
            : null}
        </Typography>
        <Button
          style={{ marginLeft: "auto" }}
          color="primary"
          variant="contained"
          component={Link}
          to={"/admin/manageAboutUs/" + props.category.id}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
export default AboutUsCard;
