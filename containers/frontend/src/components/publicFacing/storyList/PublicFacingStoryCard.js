import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import QRCode  from 'qrcode.react';

const useStyles = makeStyles({
  card: {
    display: "flex",
    position: "relative",
    background: "rgb(255,255,255)",
  },
  cardDetails: {
    flex: 1,
  },
  image: {
    width: "40%",
    height: "100%",
    right: "0px",
    position: "absolute",
  },

  Typography: {
    color: "#ffffff",
  },
});
const states = [
  {
    value: "1",
    label: "Australia",
  },
  {
    value: "2",
    label: "Poland",
  },
  {
    value: "3",
    label: "Germany",
  },
];

export default function PublicFacingStoryCard(props) {
  const classes = useStyles();
  const { resourceType, story } = props;

  return (
    <Grid item>
      <CardActionArea component="a" href={story.id}>
        <Card className={classes.card}>
          <div className={classes.cardDetails} style={{ maxWidth: "60%" }}>
            <CardContent>
              <Typography component="h2" variant="h5" color="textSecondary">
                Family: {story.familyName}
              </Typography>
              {resourceType == "Flowers" ? (
                <Typography variant="subtitle1" paragraph color="textSecondary">
                  Country:{" "}
                  {story.flowerType && !isNaN(story.flowerType)
                    ? states[story.flowerType - 1].label
                    : "undefined"}
                </Typography>
              ) : null}
              <Typography variant="subtitle1" paragraph color="textSecondary">
                Address: {story.address}
              </Typography>
              <Typography variant="subtitle1" paragraph color="textSecondary">
                Family Members: {story.familyMembers}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Continue reading...
              </Typography>
              <QRCode
                id="bill_qr_code_url"
                value={story.link} //qrcode url
                size={200} 
                fgColor="#000000"
              ></QRCode>
            </CardContent>
          </div>
          <Box
            className={classes.cardMedia}
            display={{
              xs: "block",
              sm: "block",
              md: "block",
              lg: "block",
              xl: "block",
            }}
          >
            {story.images && story.images[0] ? (
              <CardMedia
                style={{
                  width: "40%",
                  maxWidth: "600px",
                  height: "100%",
                  right: "0px",
                  position: "absolute",
                }}
                image={story.images[0].location}
              />
            ) : (
              <CardMedia
                style={{
                  width: "40%",
                  maxWidth: "600px",
                  height: "100%",
                  right: "0px",
                  position: "absolute",
                }}
                image={"/static/images/default.jpg"}
              />
            )}
          </Box>
        </Card>
      </CardActionArea>
    </Grid>
  );
}