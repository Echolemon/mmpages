import { createTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
      paper: colors.common.white,
    },
    background2: {
      default: "#bb8b89",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#bb8b89",
    },
    secondary: {
      main: "#6F5655",
    },
    text: {
      primary: "#172b4d",
      secondary: "#000000",
    },
  },
  shadows,
  typography,
});

export default theme;
