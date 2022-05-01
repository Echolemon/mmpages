import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { get } from "../../utils/http";
import { Box, Container, Typography } from "@material-ui/core";
import "react-image-gallery/styles/css/image-gallery.css";
import Footer from "src/components/publicFacing/layout/Footer";
import Loading from "src/components/Loading";

import PublicFacingImageGallery from "src/components/publicFacing/storyPage/PublicFacingImageGallery";
import ExpansionPanel from "src/components/publicFacing/storyPage/ExpansionPanel";

export default function StoryPage(props) {
  const { id } = useParams();

  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const loadData = (path) => {
    get(`${path}/${id}`).then((res) => {
      if (res.data.message) {
        console.log(res.data.message);
        setStory(res.data.message);
        setLoading(false);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (props.resourceType == "Flowers") {
      loadData("flower");
    } else if (props.resourceType == "Mezzuzot") {
      loadData("mm");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (notFound) {
    return <Navigate to={`/404`} />;
  }

  return (
    <>
      <Helmet>
        <title>{props.resourceTypeSingular} Story</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: { sm: "100%", md: "80%" }, mx: "auto" }}>
          <Box
            sx={{
              alignItems: "center",
              width: "100%",
              maxHeight: "45%",
              px: 0,
              py: 0,
              backgroundColor: "rgba(145, 129, 128, 0.55)",
            }}
          >
            <PublicFacingImageGallery images={story.images} />
          </Box>

          <Box>
            <br />
            <Typography color="textPrimary" variant="h2">
              {story.familyName} Family
            </Typography>
            <br />
            <Typography color="textPrimary" variant="h5">
              Family Members:
            </Typography>
            <Typography color="textPrimary" variant="h6">
              {story.familyMembers}
            </Typography>
            <br />

            <Typography fontStyle="" color="textPrimary" variant="h6">
              Brief story:
              <br />
              {story.briefDescription}
            </Typography>
            <br />

            <ExpansionPanel story={story} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
