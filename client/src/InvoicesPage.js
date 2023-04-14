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
  TextField,
  Box,
  Fab
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useContext, useState } from "react";
import { userContext } from "./App";

function InvoicesPage({ userClients, handleUpdateInvoice, handleUpdateClient, handleDeleteInvoice }) {

  const user = useContext(userContext);
  const [name, setName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [dateSent, setDateSent] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [description, setDescription] = useState("");
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
        }
        function autoPopulateEdit() {
          setShowEdit(true);
          setEditId(client.id);
          setName(client.name);
          setDateSent(inv.date_invoice_sent);
          setDatePaid(inv.date_invoice_paid);
          setDescription(inv.service_description);
          setCost(inv.cost);
        }
      })
      .sort((a, b) => {
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

  function handleUpdateInvoiceSubmit(e) {
    e.preventDefault();
    const inv = {
      date_invoice_sent: dateSent,
      date_invoice_paid: datePaid,
      service_description: description,
      cost: cost,
    };
    fetch(`invoices/${editId}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inv)
    }).then(res=>{
      if (res.ok){
        res.json().then(data=>handleUpdateInvoice(data))

        setShowEdit(false);
        setEditId(null);
        setCost(null);
        setDatePaid("");
        setDateSent("");
        setDescription("");
        
      } else
      res.json(data=>console.log(data))
    })


    
  }

  // Return of JSX
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleUpdateInvoiceSubmit}
      >
        <Typography variant="h5" component="h5">
          Invoice for {name}from {dateSent}
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
          type="number"
          value={cost}
          label="Cost"
          onChange={(e) => setCost(e.target.value)}
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
        <Fab variant="extended" type="submit">
          <NavigationIcon sx={{ mr: 1 }} />
          Submit
        </Fab>
      </Box>

      {/* Title for Table */}
      <Typography variant="h5" component="h5">
        Recent Invoices
      </Typography>

      {/* Beginning of Table */}
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
