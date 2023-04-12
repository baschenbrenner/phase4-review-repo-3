import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableRow,
  Link,
} from "@mui/material";
import { useContext, useState } from 'react'
import { userContext } from "./App";


function InvoicesPage({ userClients }) {
  const user = useContext(userContext);

  const rowsToDisplay = userClients
    .map(client => {
      return client.invoices.map(inv => {
        if(inv.user_id === user.id){
        return (
          <TableRow key={inv.id} className="table-row">
            <TableCell>
              <Button onClick={() => console.log(inv.id)}>Edit</Button>
            </TableCell>
            <TableCell>{inv.date_invoice_sent}</TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{inv.service_description}</TableCell>
            <TableCell>{inv.date_invoice_paid}</TableCell>
            <TableCell align="right">{`$${displayCosts(
              inv.cost
            )}.00`}</TableCell>
          </TableRow>
        );
      }}).sort((a, b) => {
        return (
          b.props.children[1].props.children -
          a.props.children[1].props.children
        );
      });
    });
    

  // This is targeting the date_invoice_sent to then be sorted
  // rowsToDisplay[0][0].props.children[1].props.children


  function displayCosts(int) {
    const num_parts = int.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  return (
    <React.Fragment>
      <Typography variant="h5" component="h5">
        Recent Invoices
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Update Invoice</TableCell>
            <TableCell>Date Sent</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Service Description</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rowsToDisplay}</TableBody>
      </Table>
      <Link
        color="primary"
        href="#"
        onClick={() => console.log("CLICKED")}
        sx={{ mt: 3 }}
      >
        See more orders
      </Link>
    </React.Fragment>
  );
}

export default InvoicesPage;
