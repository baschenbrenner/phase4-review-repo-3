import { Typography, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
// import { userContext } from "./App";
import ClientCard from "./ClientCard";
import AddEditClientForm from "./AddEditClientForm";

function ClientsPage({ userClients, handleDeleteInvoice, handleUpdateClient, errorData, setErrorData }) {
  const [showForm, setShowForm] = useState(false);
  const [nameForm, setNameForm] = useState("");
  const [poc, setPoc] = useState("");
  const [pocEmail, setPocEmail] = useState("");
  const [editClient, setEditClient] = useState(false)
  const [editId, setEditId] = useState(null);

  const clientsToDisplay = userClients.map((client) => {
    return (
      <Grid item xs={12} md={6} lg={4} xl={3} key={client.id}>
        <ClientCard
          id={client.id}
          key={client.id}
          name={client.name}
          point_of_contact={client.point_of_contact}
          poc_email={client.poc_email}
          invoices={client.invoices}
          handleDeleteInvoice={handleDeleteInvoice}
          showForm={showForm}
          setShowForm={setShowForm}
          nameForm={nameForm}
          setNameForm={setNameForm}
          poc={poc}
          setPoc={setPoc}
          pocEmail={pocEmail}
          setPocEmail={setPocEmail}
          editClient={editClient}
          setEditClient={setEditClient}
          setEditId={setEditId}
        />
      </Grid>
    );
  });

  return (
    <div>
      <Typography variant="h3" component="h3">
        Clients
      </Typography>
      <AddEditClientForm
        showForm={showForm}
        setShowForm={setShowForm}
        nameForm={nameForm}
        setNameForm={setNameForm}
        poc={poc}
        setPoc={setPoc}
        pocEmail={pocEmail}
        setPocEmail={setPocEmail}
        editClient={editClient}
        setEditClient={setEditClient}
        editId={editId}
        setEditId={setEditId}
        handleUpdateClient={handleUpdateClient}
        errorData={errorData} 
        setErrorData={setErrorData}
      />
      <Grid container spacing={2}>
        {clientsToDisplay}
      </Grid>
    </div>
  );
}

export default ClientsPage;
