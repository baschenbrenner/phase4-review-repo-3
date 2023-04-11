import React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  Collapse,
  Fab,
  Typography,
  Button,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

function AddEditClientForm({ showForm, setShowForm, nameForm, setNameForm, poc, setPoc, pocEmail, setPocEmail, editClient, setEditClient, editId, handleUpdateClient }) {
  
  function resetForm(){
    setNameForm("");
    setPoc("");
    setPocEmail("");
  }

  function handleSubmitNewClient(e) {
    e.preventDefault();
    const client = {
      name: nameForm,
      point_of_contact: poc,
      poc_email: pocEmail
    };
    console.log("Before Fetch:" , client)
    fetch("/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then(res => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
      resetForm();
  }

  function handleUpdateClientFetch(e){
    e.preventDefault();
    const client = {
      name: nameForm,
      point_of_contact: poc,
      poc_email: pocEmail
    };
    console.log("Before Fetch:" , client)
    fetch(`/clients/${editId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then(res => res.json())
      .then((data) => handleUpdateClient(data))
      .catch((err) => console.log(err));
      resetForm();
      setEditClient(false);
  }

  return (
    <div>
      <Typography variant="h2" component="h3">{ editClient ? `Edit ${nameForm}` : "Add New Client" }</Typography>
      <Button variant="outlined" onClick={()=>setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Client"}
      </Button>
      { showForm ? <Button variant="text" onClick={()=>resetForm()}>Reset Form</Button> : null }
      <Collapse in={showForm}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={ editClient ? handleUpdateClientFetch : handleSubmitNewClient }
        >
          <TextField
            required
            id="outlined-required"
            label="Client Name"
            defaultValue="Client Name"
            value={nameForm}
            onChange={(e) => setNameForm(e.target.value)}
          />
          <TextField
            required
            id="outlined"
            label="Point of Contact"
            defaultValue="Point of Contact"
            value={poc}
            onChange={(e) => setPoc(e.target.value)}
          />
          <TextField
            required
            id="outlined"
            label="Point of Contact's Email"
            defaultValue="Point of Contact's Email"
            value={pocEmail}
            onChange={(e) => setPocEmail(e.target.value)}
          />
          <Fab variant="extended" type="submit">
            <NavigationIcon sx={{ mr: 1 }} />
            Submit
          </Fab>
        </Box>
      </Collapse>
    </div>
  );
}

export default AddEditClientForm;
