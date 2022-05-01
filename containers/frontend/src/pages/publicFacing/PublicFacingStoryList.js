import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { get } from "src/utils/http";
import { makeStyles, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PublicFacingStoryCard from "src/components/publicFacing/storyList/PublicFacingStoryCard";
import MainBanner from "src/components/publicFacing/layout/MainBanner";
import { Pagination } from "@material-ui/lab";
import { SearchFilterToolbar } from "src/components/publicFacing/storyList/SearchFilter";
import { SearchAddressFilterToolbar } from "src/components/publicFacing/storyList/SearchFilter";
import Loading from "src/components/Loading";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  PaginationLayout: {
    paddingLeft: "45%",
    marginTop: "20px",
  },
}));

export default function PublicFacingStoryList(props) {
  const classes = useStyles();
  const [stories, setStories] = useState({});
  const [loading, setLoading] = useState(true);
  const [currrentPageStories, setCurrentPageStories] = useState({});
  const [maxPage, setMaxPage] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const loadData = (path) => {
    get(path).then((res) => {
      setStories(res.data.message);
      setCurrentPageStories(res.data.message.slice(0, 9));
      setMaxPage(Math.ceil(res.data.message.length / 9));
      setLoading(false);
      console.log(stories);
    });
  };

  const handlePageChange = (event, value) => {
    setCurPage(value);
    setCurrentPageStories(stories.slice((value - 1) * 9, value * 9));
  };

  const handleOnSearchChange = (newValue, item, checkboxes) => {
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
      if(item == "FamilyName"){
        return (
          story.familyName.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
        );
      }else if (item == "Address"){
        return (
          story.address.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
        );
      }else if (item == "FamilyMembers"){
        return (
          story.familyMembers.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
        );
      }
      // return (
      //     story.familyName.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
      // );
    });

    setCurPage(1);
    setMaxPage(Math.ceil(result.length / 12));
    setCurrentPageStories(result.slice((curPage - 1) * 12, curPage * 12));
  };


  const handleOnSearchAddChange = (newValue, checkboxes) => {
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
        story.address.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
      );
    });

    setCurPage(1);
    setMaxPage(Math.ceil(result.length / 12));
    setCurrentPageStories(result.slice((curPage - 1) * 12, curPage * 12));
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

  return (
    <>
      <Helmet>
        <title>{props.resourceType}</title>
      </Helmet>
      <MainBanner
        title={props.resourceType}
        imageSrc={"/static/images/missing_header.png"}
      />
      <SearchFilterToolbar
        stories={stories}
        handleonsearchchange={handleOnSearchChange}
        resourceType={props.resourceType}
      />
      {/* <SearchAddressFilterToolbar
        stories={stories}
        handleonsearchchange={handleOnSearchAddChange}
        resourceType={props.resourceType}
      /> */}

      <br />
      <Box>
        <Grid container alignItems="center" justify="center" spacing={3}>
          {currrentPageStories.map((story) => (
            <Grid item lg={12} md={12} xs={12} key={story.id}>
              <PublicFacingStoryCard
                story={story}
                resourceType={props.resourceType}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination
        className={classes.PaginationLayout}
        color="primary"
        hidePrevButton
        hideNextButton
        count={maxPage}
        page={curPage}
        size="large"
        onChange={handlePageChange}
      />
    </>
  );
}
