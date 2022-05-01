import { Outlet } from "react-router-dom";
import Header from "src/components/publicFacing/layout/Header";
import Footer from "src/components/publicFacing/layout/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Box } from "@material-ui/core";
export default function PublicLayout() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "xs",
          backgroundColor: "rgb(239,235,237)",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          justifyContent: "space-between",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <Box sx={{ width: "95%", marginLeft: "2.5%" }}>
          <Header />
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
}
