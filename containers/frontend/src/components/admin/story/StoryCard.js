import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { toTimeAgoString } from "src/utils/date";

export default function StoryCard(props) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            alt={props.resourceTypeSingular}
            src={
              props.resourceType == "Flowers"
                ? `/static/images/flowers/flower_${props.story.flowerType}.png`
                : `/static/images/mezzuzot/mezzuzah_/${props.story.mezzuzahType}/.png`
            }
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {props.story.familyName}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {props.story.address}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          p: 2,
        }}
      >
        <Box sx={{ ml: 2 }}>
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to={`${window.location.pathname}/${props.story.id}`}
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ pt: 0.7 }}>
          <Typography color="textSecondary" align="right" variant="body2">
            Last modified: {toTimeAgoString(props.story.updatedAt)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
