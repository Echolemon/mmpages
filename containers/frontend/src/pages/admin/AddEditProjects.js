import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
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
  Grid,
  Container,
} from "@material-ui/core";
import AboutUsCard from "src/components/admin/aboutUs/AboutUsCard";
import { get } from "src/utils/http";
import { Category } from "@material-ui/icons";

// need to allow additional add on
const catgeories = [
  { title: "Glass Flower", id: "gf" },
  { title: "Missing Mezzuzot", id: "mm" },
  { title: "Animation", id: "an" },
];
const AddEditProjects = () => {
  return (
    <>
      <Helmet>
        <title>Projects</title>
      </Helmet>
      <Box sx={{ pt: 2 }}>
        <Grid container spacing={3}>
          {catgeories.map((category) => (
            <Grid item key={category.id} lg={3} md={6} xs={12}>
              <AboutUsCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default About;
