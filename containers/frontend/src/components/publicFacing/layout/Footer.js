import React from "react";
import { Box, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navItems: {
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: 16,
    },
  },
}));
const Footer = () => {
  const classes = useStyles();
  const sections = [
    { title: "Glass Flowers", url: "/flowerStory/list" },
    { title: "Missing Mezzuzot", url: "/mezzuzahStory/list" },
    { title: "Animations", url: "/animations" },
  ];

  return (
    <Box
      sx={{
        background: "rgba(128,42,39, 0.5)",

        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        top: "10px",
        bottom: "0px",
        position: "relative",
        width: "100%",
        minHeight: "50px",
        maxHeight: "500px",
        color: "rgb(256, 256, 256)",
        padding: 15,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        {sections.map((section) => (
          <Box sx={{ flex: 1, marginTop: 0, my: { xs: 1, sm: 0 } }}>
            <Link
              href={section.url}
              color="inherit"
              className={classes.navItems}
            >
              {section.title}
            </Link>
          </Box>
        ))}
      </Box>
      <Box>
        <a href="/">
          <img
            src={"/static/images/logo.png"}
            style={{
              height: "50px",
              objectFit: "cover",
              paddingTop: 10,
            }}
          />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
