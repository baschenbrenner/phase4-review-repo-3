import React from "react";
import { useState } from "react";
import { Box, TextField, Collapse, Fab, Typography, Button } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';

function AddEditClientForm() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [poc, setPoc] = useState("");
  const [pocEmail, setPocEmail] = useState("");

  console.log(poc)
  console.log(pocEmail)

  return (
    <div>
        <Button variant="outlined" onClick={()=>setShowForm(!showForm)}>{ showForm ? "Hide Form" : "Add New Client" }</Button>
        <Collapse in={showForm}>
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-required"
        label="Client Name"
        defaultValue={name}
        onChange={e=>setName(e.target.value)}
      />
      <TextField
        required
        id="outlined"
        label="Point of Contact"
        defaultValue={poc}
        onChange={e=>setPoc(e.target.value)}
      />
      <TextField
        required
        id="outlined"
        label="Point of Contact"
        defaultValue={pocEmail}
        onChange={e=>setPocEmail(e.target.value)}
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
