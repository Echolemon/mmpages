import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
} from "react-feather";
import NavItem from "./NavItem";

const items = [
  {
    href: "/admin/home",
    icon: BarChartIcon,
    title: "Home Page",
  },
  {
    href: "/admin/flowers",
    icon: BarChartIcon,
    title: "Glass Flowers",
  },
  {
    href: "/admin/mezzuzot",
    icon: BarChartIcon,
    title: "Missing Mezzuzot",
  },
  {
    href: "/admin/webAnimation",
    icon: BarChartIcon,
    title: "Animations",
  },
  {
    href: "/admin/manageAboutUs",
    icon: BarChartIcon,
    title: "About Us",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9f8",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "64px",
          flexDirection: "column",
          backgroundColor: "#bb8b89",
          p: 2,
        }}
      >
        <Avatar
          alt="ProjectLogo"
          src={"/static/images/TransparentHomepageLogo.png"}
          style={{
            display: "inline-block",
            maxWidth: "100%",
            width: 200,
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Box display={{ xs: "block", lg: "none" }}>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Box>
      <Box display={{ xs: "none", lg: "block" }}>{content}</Box>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
