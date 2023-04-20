import { Typography, Grid, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useState } from "react";
import ClientCard from "./ClientCard";
import AddEditClientForm from "./AddEditClientForm";
import AddInvoiceForm from "./AddInvoiceForm";

function ClientsPage({
  errorsToDisplay,
  handleAddInvoice,
  userClients,
  clients,
  setClients,
  handleDeleteInvoice,
  handleUpdateClient,
  errorData,
  setErrorData,
}) {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [nameForm, setNameForm] = useState("");
  const [poc, setPoc] = useState("");
  const [pocEmail, setPocEmail] = useState("");
  const [editClient, setEditClient] = useState(false);
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
          showForm={showClientForm}
          setShowForm={setShowClientForm}
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

  function handleAddClientFormClick(){
    if(showInvoiceForm === true){
      setShowInvoiceForm(false);
      setShowClientForm(!showClientForm);
    } else
    setShowClientForm(!showClientForm);
  }

  function handleAddInvoiceFormClick(){
    if(showClientForm === true){
      setShowClientForm(false);
      setShowInvoiceForm(!showInvoiceForm);
    } else
    setShowInvoiceForm(!showInvoiceForm);
  }

  // *** Return of JSX ***
  return (
    <div>
      <Typography variant="h2" component="h3">
        Clients Page
      </Typography>
      <ButtonGroup className="form-button-group">
        <Button
          variant="outlined"
          onClick={handleAddClientFormClick}
        >
          {showClientForm ? "Hide New Client" : "Add New Client"}
        </Button>
        <Button
          variant="outlined"
          onClick={handleAddInvoiceFormClick}
        >
          {showInvoiceForm ? "Hide New Invoice" : "Add New Invoice"}
        </Button>
      </ButtonGroup>
      <AddEditClientForm
        showClientForm={showClientForm}
        setShowClientForm={setShowClientForm}
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
        errorsToDisplay={errorsToDisplay}
        setErrorData={setErrorData}
        clients={clients}
        setClients={setClients}
      />
      <AddInvoiceForm
        errorData={errorData}
        setErrorData={setErrorData}
        clients={clients}
        errorsToDisplay={errorsToDisplay}
        handleAddInvoice={handleAddInvoice}
        showInvoiceForm={showInvoiceForm}
        setShowInvoiceForm={setShowInvoiceForm}
      />
      <Grid container spacing={2}>
        {clientsToDisplay}
      </Grid>
    </div>
  );
}

export default ClientsPage;
