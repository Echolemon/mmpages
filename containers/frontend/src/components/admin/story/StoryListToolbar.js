import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";

export default function StoryListToolbar(props) {
  const [search, setSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    poland: true,
    germany: true,
    australia: true,
  });

  const onSearchChange = (newValue) => {
    props.handleonsearchchange(newValue, selectedCheckboxes);
    setSearch(newValue);
  };

  const onCheckboxChange = (event) => {
    props.handleonsearchchange(search, {
      ...selectedCheckboxes,
      [event.target.name]: event.target.checked,
    });
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={`${window.location.pathname}/new`}
        >
          New {props.resourceTypeSingular}
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                placeholder={`Search ${props.resourceType}`}
                variant="outlined"
                id="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Box>
            {props.resourceType == "Flowers" ? (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={selectedCheckboxes.poland}
                      onChange={onCheckboxChange}
                      name="poland"
                    />
                  }
                  label="Poland"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={selectedCheckboxes.germany}
                      onChange={onCheckboxChange}
                      name="germany"
                    />
                  }
                  label="Germany"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={selectedCheckboxes.australia}
                      onChange={onCheckboxChange}
                      name="australia"
                    />
                  }
                  label="Australia"
                />
              </>
            ) : null}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
