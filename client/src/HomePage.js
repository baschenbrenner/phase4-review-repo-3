import React, { useEffect, useContext, useState } from "react";
import { userContext } from "./App";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, Paper } from "@mui/material";

function HomePage({ userClients, openInvoiceBalance }) {
  const navigate = useNavigate();
  const user = useContext(userContext);
  const [highest, setHighest] = useState([]);

  function displayCosts(int) {
    const num_parts = int.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  // function handleMostExpensive(){
  //   fetch('/invoices/highest')
  //   .then(res=> res.json())
  //   .then(data=>setHighest(data))
  // };

  // const highestInvoices= highest.map(inv=>{
  //   return <Typography variant="p" component="h5">Cost: {inv.cost} Description: {inv.service_description}</Typography>
  // })

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
            {/* <Button onClick={handleMostExpensive}>Most Expensive Invoices</Button> */}
          </Paper>
          {/* {highestInvoices} */}
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
