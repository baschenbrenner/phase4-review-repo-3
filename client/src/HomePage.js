import React, { useEffect, useContext } from "react";
import { userContext } from "./App";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, Paper } from "@mui/material";

function HomePage({ userClients, openInvoiceBalance }) {
  const navigate = useNavigate();
  const user = useContext(userContext);

  function displayCosts(int) {
    const num_parts = int.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  return (
    <div>
      <Typography variant="h4" component="h3" className="home-header">
        Welcome, {user.username}!
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={4}>
            <Typography variant="h3" component="h3">
              {" "}
              Open Invoices
            </Typography>
            <Typography variant="h4" component="h4">
              {" "}
              ${displayCosts(openInvoiceBalance)}
            </Typography>
            <Button variant="text" onClick={() => navigate("/invoices")}>
              See All Invoices
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
