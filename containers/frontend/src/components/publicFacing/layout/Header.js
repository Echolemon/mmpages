import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Typography,
  Toolbar,
  Link,
  Slide,
  makeStyles,
  IconButton,
  Collapse,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "src/components/publicFacing/layout/Filter";
import multipleFilter from "src/components/publicFacing/layout/Filter";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  header: {
    // background: "rgba(128,42,39, 0.5)",
    // color: 'white'
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    display: "none",
    justifyContent: "space-evenly",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  toolbarLink: {
    textAlign: "center",
    padding: "10px",
    width: "100%",

    "&:hover": {
      background: "rgba(128,42,39, 0.3)",
    },
  },
  projectsLinkContainer: {
    padding: "10px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      "& $projectsLinkBox2": {
        display: "flex",
      },
    },
  },
  projectsLinkDropdown: {
    textAlign: "center",
    padding: "10px",
    width: "100%",
  },
  projectsLinkBox: {
    position: "relative",
    zIndex: "1",
  },
  projectsLinkBox2: {
    position: "absolute",
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    background: "rgb(239,235,237)",
    width: "100%",
  },
  projectsLink: {},

  mobileMenu: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  mobileLinkContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  mobileNavItem: {
    fontSize: "16px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const sections = [
    { title: "Home", url: "/home" },
    { title: "Projects", url: "/projects" },
    // { title: "Flowers", url: "/flowerStory/list" },
    // { title: "Mezzuzot", url: "/mezzuzahStory/list" },
    // { title: "Animations", url: "/animations" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Donation", url: "/#" },
  ];

  const [expanded, setExpanded] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProjectsExpandClick = () => {
    setProjectsExpanded(!projectsExpanded);
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <img
              alt="ProjectLogo"
              src={"/static/images/TransparentHomepageLogo.png"}
              style={{
                display: "block",
                align: "center",
                maxWidth: "100%",
                width: 220,
              }}
            />
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            className={classes.mobileMenu}
            onClick={handleExpandClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* desktop menu */}
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {sections.map((section) => {
            if (section.title == "Projects") {
              return (
                <Box className={`${classes.projectsLinkContainer}`}>
                  <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    underline="none"
                    className={`${classes.projectsLinkDropdown}`}
                  >
                    {section.title}
                  </Link>
                  <Box className={`${classes.projectsLinkBox}`}>
                    <Box className={`${classes.projectsLinkBox2}`}>
                      <Link
                        color="inherit"
                        noWrap
                        key={"Glass Flowers"}
                        variant="body2"
                        href={"/glassFlowers"}
                        underline="none"
                        className={`${classes.toolbarLink} ${classes.projectsLink}`}
                      >
                        Glass Flowers
                      </Link>
                      <Link
                        color="inherit"
                        noWrap
                        key={"Missing Mezzuzot"}
                        variant="body2"
                        href={"/missingMezzuzot"}
                        underline="none"
                        className={`${classes.toolbarLink} ${classes.projectsLink}`}
                      >
                        Missing Mezzuzot
                      </Link>
                    </Box>
                  </Box>
                </Box>
              );
            } else {
              return (
                <Link
                  color="inherit"
                  noWrap
                  key={section.title}
                  variant="body2"
                  href={section.url}
                  className={classes.toolbarLink}
                  underline="none"
                >
                  {section.title}
                </Link>
              );
            }
          })}
        </Toolbar>

        {/* mobile menu */}
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          className={`${classes.mobileLinkContainer} ${classes.mobileMenu}`}
        >
          {sections.map((section) => {
            if (section.title == "Projects") {
              return (
                <Box sx={{ m: 1 }} className={classes.mobileMenu}>
                  <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    underline="none"
                    onClick={handleProjectsExpandClick}
                    component="button"
                    className={`${classes.mobileNavItem} ${classes.mobileMenu}`}
                  >
                    {section.title}
                  </Link>
                  <Collapse
                    in={projectsExpanded}
                    timeout="auto"
                    unmountOnExit
                    className={`${classes.mobileLinkContainer} ${classes.mobileMenu}`}
                  >
                    <Box sx={{ m: 1 }} className={classes.mobileMenu}>
                      <Link
                        color="inherit"
                        noWrap
                        key={"Glass Flowers"}
                        variant="body2"
                        href={"/glassFlowers"}
                        underline="none"
                        className={`${classes.mobileNavItem} ${classes.mobileMenu}`}
                      >
                        Glass Flowers
                      </Link>
                    </Box>
                    <Box sx={{ m: 1 }} className={classes.mobileMenu}>
                      <Link
                        color="inherit"
                        noWrap
                        key={"Missing Mezzuzot"}
                        variant="body2"
                        href={"/missingMezzuzot"}
                        underline="none"
                        className={`${classes.mobileNavItem} ${classes.mobileMenu}`}
                      >
                        Missing Mezzuzot
                      </Link>
                    </Box>
                  </Collapse>
                </Box>
              );
            } else {
              return (
                <Box sx={{ m: 1 }} className={classes.mobileMenu}>
                  <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    underline="none"
                    className={`${classes.mobileNavItem} ${classes.mobileMenu}`}
                  >
                    {section.title}
                  </Link>
                </Box>
              );
            }
          })}
        </Collapse>
      </div>
    </Fragment>
  );
}
