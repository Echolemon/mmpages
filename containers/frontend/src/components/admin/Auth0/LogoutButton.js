/*
*	Responsible for processing business logic of Logout Button
*/

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@material-ui/core";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={() => logout({ returnTo: window.location.origin + "/login" })}
    >
      Log Out
    </IconButton>
  );
};

export default LogoutButton;
