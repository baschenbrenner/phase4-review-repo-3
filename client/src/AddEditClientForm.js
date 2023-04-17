import React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  Collapse,
  Fab,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

function AddEditClientForm({
  showForm,
  clients,
  setClients,
  setShowForm,
  nameForm,
  setNameForm,
  poc,
  setPoc,
  pocEmail,
  setPocEmail,
  editClient,
  setEditClient,
  editId,
  handleUpdateClient,
  errorsToDisplay,
  setErrorData,
}) {
  function resetForm() {
    setNameForm("");
    setPoc("");
    setPocEmail("");
    setEditClient(false);
    setShowForm(false);
    setErrorData([]);
  }

  function handleSubmitNewClient(e) {
    e.preventDefault();
    const client = {
      name: nameForm,
      point_of_contact: poc,
      poc_email: pocEmail,
    };
    fetch("/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => setClients([...clients, data]));
        resetForm();
      } else res.json().then((data) => setErrorData(data.errors));
    });
  }

  function handleUpdateClientFetch(e) {
    e.preventDefault();
    const client = {
      name: nameForm,
      point_of_contact: poc,
      poc_email: pocEmail,
    };
    console.log("Before Fetch:", client);
    fetch(`/clients/${editId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => handleUpdateClient(data));
        resetForm();
        setEditClient(false);
      } else res.json().then((data) => setErrorData(data.errors));
    });
  }

  // *** Return of JSX ***
  return (
    <div>
      <Typography variant="h5" component="h4">
        {editClient && showForm ? "Edit Client" : "Add New Client"}
      </Typography>
      <Button variant="outlined" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Client"}
      </Button>
      {showForm ? (
        <Button variant="text" onClick={() => resetForm()}>
          {editClient ? "Reset Form" : "Discard New Client"}
        </Button>
      ) : null}
      <Collapse in={showForm}>
        <Grid container spacing={2} className="add-edit-form">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={
              editClient ? handleUpdateClientFetch : handleSubmitNewClient
            }
          >
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Client Name"
                value={nameForm}
                onChange={(e) => setNameForm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined"
                label="Point of Contact"
                value={poc}
                onChange={(e) => setPoc(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined"
                label="Point of Contact's Email"
                value={pocEmail}
                onChange={(e) => setPocEmail(e.target.value)}
              />
            </Grid>
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

export default AddEditClientForm;
