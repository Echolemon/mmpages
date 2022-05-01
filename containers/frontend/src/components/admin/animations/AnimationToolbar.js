import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  Divider,
  TextField,
  InputAdornment,
  FormControlLabel,
  Fab,
  Checkbox,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import React, { useState, useEffect } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

import AnimationCreation from "src/components/admin/animations/AnimationCreation";

const AnimationListToolbar = ({ props, animations, setAnimations }) => {
  const [openAdd, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  return (
    <>
      <AnimationCreation
        openAdd={openAdd}
        setAddOpen={setAddOpen}
        animations={animations}
        setAnimations={setAnimations}
      />
      <Box {...props}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button color="primary" variant="contained" onClick={handleAddOpen}>
            Add Animation
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AnimationListToolbar;
