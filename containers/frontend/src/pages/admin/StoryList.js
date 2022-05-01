import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { get } from "src/utils/http";
import { Box, Container, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import StoryListToolbar from "src/components/admin/story/StoryListToolbar";
import StoryCard from "src/components/admin/story/StoryCard";
import Loading from "src/components/Loading";

export default function StoryList(props) {
  const [stories, setStories] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredStories, setFilteredStories] = useState({});
  const [CurrentPageStories, setCurrentPageStories] = useState({});
  const [maxPage, setMaxPage] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const loadData = (path) => {
    get(path).then((res) => {
      res.data.message.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
      setStories(res.data.message);
      setFilteredStories(res.data.message);
      setCurrentPageStories(res.data.message.slice(0, 12));
      setMaxPage(Math.ceil(res.data.message.length / 12));
      setLoading(false);
    });
  };

  const handleOnSearchChange = (newValue, checkboxes) => {
    let temp = stories;
    if (props.resourceType == "Flowers") {
      var selectedCountries = Object.keys(checkboxes).filter(
        (key) => checkboxes[key]
      );
      var selectedFlowerTypes = [];
      for (var country of selectedCountries) {
        if (country == "australia") {
          selectedFlowerTypes.push("1");
        } else if (country == "poland") {
          selectedFlowerTypes.push("2");
        } else {
          selectedFlowerTypes.push("3");
        }
      }

      temp = stories.filter((flower) => {
        return (
          selectedFlowerTypes.indexOf(flower.flowerType.toLowerCase()) > -1
        );
      });
    }

    let result = temp.filter((story) => {
      return (
        story.familyName.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
      );
    });

    setCurPage(1);
    setMaxPage(Math.ceil(result.length / 12));
    setCurrentPageStories(result.slice((curPage - 1) * 12, curPage * 12));
    setFilteredStories(result);
  };

  const handleOnCheckboxChange = (temp) => {
    setFilteredStories(temp);
  };

  const handlePageChange = (event, value) => {
    setCurPage(value);
    setCurrentPageStories(filteredStories.slice((value - 1) * 12, value * 12));
  };

  useEffect(() => {
    setLoading(true);
    if (props.resourceType == "Flowers") {
      loadData("flower");
    } else if (props.resourceType == "Mezzuzot") {
      loadData("mm");
    }
  }, [props.resourceType]);

  if (loading) {
    return (
      <>
        {" "}
        <Loading />{" "}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{props.resourceType}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
        }}
      >
        <Container maxWidth={false}>
          <StoryListToolbar
            handleonsearchchange={handleOnSearchChange}
            resourceTypeSingular={props.resourceTypeSingular}
            resourceType={props.resourceType}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {CurrentPageStories.map((story) => (
                <Grid item key={story.id} lg={3} md={6} xs={12}>
                  <StoryCard
                    story={story}
                    resourceTypeSingular={props.resourceTypeSingular}
                    resourceType={props.resourceType}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              hidePrevButton
              hideNextButton
              count={maxPage}
              page={curPage}
              size="small"
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
