import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@material-ui/core";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(128,42,39, 0.05)",
  display: "flex",
  minHeight: "100%",
  overflow: "auto",
  width: "100%",
}));

const DashboardLayoutWrapper = styled("div")(({ theme }) => ({
  marginTop: 80,
  marginBottom: 20,
  width: "95%",
  marginLeft: "2.5%",
  marginRight: "2.5%",
  // flexGrow: 1,
}));

// const DashboardLayoutContainer = styled("div")({
//   display: "flex",
//   flex: "1 1 auto",
//   overflow: "hidden",
// });

// const DashboardLayoutContent = styled("div")({
//   flex: "1 1 auto",
//   height: "100%",
//   overflow: "auto",
// });

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <Outlet />
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default withAuthenticationRequired(DashboardLayout, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});

// export default DashboardLayout;
