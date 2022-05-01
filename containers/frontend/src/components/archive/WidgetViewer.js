import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";

const WidgetViewer = (props) => {
  const { element, ...other } = props;

  return (
    <Card variant="outlined" sx={{ mb: 8 }} {...other}>
      <Divider />
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </Card>
  );
};

WidgetViewer.propTypes = {
  element: PropTypes.node.isRequired,
};

export default WidgetViewer;
