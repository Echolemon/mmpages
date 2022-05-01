import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { SnackbarProvider } from "notistack";

const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://mezzuzotproject.com/admin"
    : "http://localhost:3000/admin";

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-rrfcl7p0.us.auth0.com"
      clientId="8I3TUTEZ5XOSUIxPsxy4yft7oEY4Xnj3"
      redirectUri={REDIRECT_URI}
    >
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Auth0Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

serviceWorker.unregister();
