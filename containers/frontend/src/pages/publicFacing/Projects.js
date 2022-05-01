import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import MainBanner from "src/components/publicFacing/layout/MainBanner";
import { get } from "src/utils/http";
import { Box } from "@material-ui/core";
// import parser from "html-react-parser";
import Loading from "src/components/Loading";
import { images, audios, videos } from "src/utils/mediaLoader"

export default function Projects(props) {
  const [content, setPage] = useState({});
  const [loading, setLoading] = useState(true);
  const loadProjectsPage = (category) => {
    get(`about/${category}`).then((res) => {
      setPage(res.data.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    // loadProjectsPage(props.resourceType);
    if (props.resourceType == "Glass Flowers") {
      loadProjectsPage("gf");
    } else if (props.resourceType == "Missing Mezzuzot") {
      loadProjectsPage("mm");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{props.resourceType}</title>
      </Helmet>
      <MainBanner
        title={`${props.resourceType}`}
        imageSrc={"/static/images/missing_header.png"}
      />
      <Box
        sx={{
          paddingTop: "18px",
          paddingLeft: "18px",
          paddingRight: "18px",
        }}
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap&family=Open+Sans:wght@300&display=swap');
        </style>
        {/* <div> {parser(content.title)} </div>
        <div> {parser(content.description)} </div> */}

        <br />
        <Box>{images(content)}</Box>
        <Box>{audios(content)}</Box>
        <Box>{videos(content)}</Box>
      </Box>
    </>
  );
}
