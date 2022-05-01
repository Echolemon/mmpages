import { Box } from "@material-ui/core";

const Loading = (props) => (
  <Box display="flex" width="100%" alignItems="center" justifyContent="center">
    <img
      alt="ProjectLogo"
      src={"/static/images/loading.gif"}
      style={{
        display: "inline-block",
        marginTop: 250,
        maxWidth: "100%",
        width: 54,
      }}
    />
  </Box>
);

export default Loading;
