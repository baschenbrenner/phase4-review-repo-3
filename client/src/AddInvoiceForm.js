import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  TextField,
  Collapse,
  Fab,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { userContext } from "./App";

function AddInvoiceForm({
  errorsToDisplay,
  setErrorData,
  clients,
  handleAddInvoice,
  showInvoiceForm,
  setShowInvoiceForm,
  notify,
  setNotify
}) {
  const user = useContext(userContext);
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [dateSent, setDateSent] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [showPay, setShowPay] = useState(false);

  function resetForm() {
    setShowInvoiceForm(false);
    setErrorData([]);
    setClientId(null);
    setCost("");
    setDescription("");
    setDatePaid("");
    setDateSent("");
  }

  useEffect(() => {
    setDropdownOptions(
      clients.map((client) => {
        return (
          <MenuItem value={client.id} key={client.id}>
            {client.name}
          </MenuItem>
        );
      })
    );
  }, [clients]);

  function handleSubmitNewInvoice(e) {
    e.preventDefault();
    const inv = {
      client_id: clientId,
      user_id: user.id,
      cost: cost,
      service_description: description,
      date_invoice_sent: dateSent,
      date_invoice_paid: datePaid,
    };
    console.log("Before FETCH", inv);
    fetch("/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inv),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => handleAddInvoice(data));
        resetForm();
      } else res.json().then((data) => setErrorData(data.errors));
    });
    setNotify({
      isOpen: true,
      message: "New invoice added successfully",
      type: "success"
    });
  }

  //  *** Return of JSX ***
  return (
    <div>
      {showInvoiceForm ? (
        <Button variant="text" onClick={() => resetForm()}>
          Discard New Invoice
        </Button>
      ) : null}
      <Collapse in={showInvoiceForm}>
        <Grid container spacing={2} className="add-edit-form">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitNewInvoice}
          >
            {/* *** Dropdown Select *** */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Client</InputLabel>
              <Select
                required
                labelId="client-label"
                id="client-select"
                value={clientId}
                label="Client"
                onChange={(e) => setClientId(e.target.value)}
              >
                {dropdownOptions}
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Description of Service"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Date Invoice Sent"
                value={dateSent}
                onChange={(e) => setDateSent(e.target.value)}
              />
            </Grid>
            {showPay ? (
              <Grid item xs={12}>
                <TextField
                  id="outlined"
                  label="Date Invoice Paid"
                  value={datePaid}
                  onChange={(e) => setDatePaid(e.target.value)}
                />
              </Grid>
            ) : null}
            <FormControlLabel
              control={<Checkbox />}
              label="Already paid?"
              onChange={() => setShowPay(!showPay)}
            />

            {errorsToDisplay}

            <Grid item xs={12}>
              <Fab variant="extended" type="submit">
                <NavigationIcon sx={{ mr: 1 }} />
                Submit
              </Fab>
            </Grid>
          </Box>
        </Grid>
      </Collapse>
    </div>
  );
}

export default AddInvoiceForm;
