import React, { useContext, useState, useEffect } from "react";
import { userContext } from "./App";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableRow,
  TextField,
  Box,
  Fab,
  Collapse,
  Grid,
  Paper,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Notification from "./Notification";

function InvoicesPage({
  userClients,
  handleUpdateInvoice,
  handleDeleteInvoice,
  setErrorData,
  errorsToDisplay,
  openInvoiceBalance,
  notify,
  setNotify
}) {
  const user = useContext(userContext);
  const [showForm, setShowForm] = useState(false);
  const [dateSent, setDateSent] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [editId, setEditId] = useState(null);
  const [cost, setCost] = useState(null);


  const rowsToDisplay = userClients.map((client) => {
    return client.invoices
      .map((inv) => {
        if (inv.user_id === user.id) {
          return (
            <TableRow key={inv.id} className="table-row">
              <TableCell>
                <Button onClick={() => autoPopulateEdit()}>Edit</Button>
                <Button onClick={() => handleDeleteInvoice(inv.id)}>
                  Delete
                </Button>
              </TableCell>
              <TableCell>{inv.date_invoice_sent}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{inv.service_description}</TableCell>
              <TableCell>
                {inv.date_invoice_paid !== null && inv.date_invoice_paid !== ""
                  ? inv.date_invoice_paid
                  : "Not Paid"}
              </TableCell>
              <TableCell align="right" style={{background: inv.date_invoice_paid === null ? "#f07167" : "#90a955" }}>
                {`$${displayCosts(inv.cost)}.00`}
              </TableCell>
            </TableRow>
          );
        }
        function autoPopulateEdit() {
          setShowForm(true);
          setEditId(inv.id);
          setClientName(client.name);
          setDateSent(inv.date_invoice_sent);
          setDatePaid(inv.date_invoice_paid);
          setDescription(inv.service_description);
          setCost(parseInt(inv.cost));
        }
      })
      .sort((a, b) => {
        return (
          b.props.children[1].props.children -
          a.props.children[1].props.children
        );
      });
  });

  function displayCosts(int) {
    const num_parts = int.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  function handleUpdateInvoiceSubmit(e) {
    e.preventDefault();
    const inv = {
      date_invoice_sent: dateSent,
      date_invoice_paid: datePaid,
      service_description: description,
      cost: cost,
    };
    fetch(`invoices/${editId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inv),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => handleUpdateInvoice(data));
        resetForm();
      } else res.json((data) => setErrorData(data.errors));
    });
  }
  console.log(errorsToDisplay)


  function resetForm() {
    setShowForm(false);
    setEditId(null);
    setCost(null);
    setClientName("");
    setDatePaid("");
    setDateSent("");
    setDescription("");
  }



  // *****   Return of JSX   *****
  return (
    <React.Fragment>
      <Collapse in={showForm}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleUpdateInvoiceSubmit}
        >
          <Button variant="text" onClick={() => resetForm()}>
            Discard Edit Invoice
          </Button>
          <Typography variant="h5" component="h5">
            Invoice for {clientName} from {dateSent}
          </Typography>
          <TextField
            id="outlined"
            value={description}
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          >
            {description}
          </TextField>
          <TextField
            id="outlined"
            value={cost}
            label="Cost"
            onChange={(e) => setCost(parseInt(e.target.value))}
          >
            {cost}
          </TextField>
          <TextField
            id="outlined"
            value={dateSent}
            label="Date Sent"
            onChange={(e) => setDateSent(e.target.value)}
          >
            {dateSent}
          </TextField>
          <TextField
            id="outlined"
            value={datePaid}
            label="Date Paid"
            onChange={(e) => setDatePaid(e.target.value)}
          >
            {datePaid}
          </TextField>
          {/* {errorsToDisplay} */}
          <Fab variant="extended" type="submit">
            <NavigationIcon sx={{ mr: 1 }} />
            Submit
          </Fab>
        </Box>
      </Collapse>
      {errorsToDisplay}


      {/* **** Title for Page  *****/}
      <Typography variant="h2" component="h3">
        Invoices
      </Typography>

      {/* Open Invoice Total */}
      <Grid container id="invoice-total">
        <Grid item xs={12} >
          <Paper elevation={2} className="open-invoice-total">
            <Typography variant="h5" component="h4" >
              Open Invoice Total: ${displayCosts(openInvoiceBalance)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Beginning of Table */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Update Invoice</TableCell>
            <TableCell>Date Sent</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Service Description</TableCell>
            <TableCell>Date Paid</TableCell>
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rowsToDisplay}</TableBody>
      </Table>
      <Notification notify={notify} setNotify={setNotify} />
    </React.Fragment>
  );
}

export default InvoicesPage;
