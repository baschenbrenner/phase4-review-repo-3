import { Typography, Grid } from "@mui/material";
import React from "react";
// import { useContext } from "react";
// import { userContext } from "./App";
import ClientCard from "./ClientCard";

function ClientsPage({ userClients, handleDeleteInvoice }){
    // const user = useContext(userContext);

    const clientsToDisplay = userClients.map(client=>{
        return <Grid item xs={12} md={6} lg={4} xl={3} key={client.id}>
                    <ClientCard id={client.id} 
                                key={client.id} 
                                name={client.name} 
                                point_of_contact={client.point_of_contact} 
                                poc_email={client.poc_email}
                                invoices={client.invoices} 
                                handleDeleteInvoice={handleDeleteInvoice} />
                </Grid>
    })

    return(
        <div>
            <Typography variant="h3" component="h3">Clients</Typography>
            <Grid container spacing={2}> 
                { clientsToDisplay }
            </Grid>
        </div>
    )
};

export default ClientsPage;