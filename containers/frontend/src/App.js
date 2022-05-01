/*
 *   This is the file for App Component.
 *   App Component is the main component in React which acts as a container for
 *   all other components.
 */
import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/GlobalStyles";
import "src/mixins/chartjs";
import theme from "src/theme";
import routes from "src/routes";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";

const App = () => {
  const routing = useRoutes(routes);

  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
