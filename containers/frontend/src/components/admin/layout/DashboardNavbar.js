import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Badge, Box, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import Logo from "./Logo";
import LogoutButton from "../Auth0/LogoutButton";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/admin">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box display={{ xs: "none", lg: "block", xl: "block" }}>
          <LogoutButton></LogoutButton>
          {/* <IconButton color="inherit" component={RouterLink} to="/login">
            <InputIcon />
          </IconButton> */}
        </Box>
        <Box display={{ xs: "block", lg: "none", xl: "none" }}>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
