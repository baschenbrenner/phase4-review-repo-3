import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";

function NavBar({ onLogout }) {
  const navigate = useNavigate();

  function handleSignOutClick() {
    fetch("/logout", {
      method: "DELETE",
    }).then(onLogout());
    navigate("/signin");
  }

  return (
    <div>
      <ButtonGroup>
      <Button onClick={() => navigate("/home")} variant="outlined">
        Home
      </Button>
      <Button onClick={() => navigate("/invoices")} variant="outlined">
        Invoices
      </Button>
      <Button onClick={() => navigate("/clients")} variant="outlined">
        Clients
      </Button>
      <Button onClick={handleSignOutClick} variant="contained">
        Logout
      </Button>
      </ButtonGroup>
    </div>
  );
}
export default NavBar;
