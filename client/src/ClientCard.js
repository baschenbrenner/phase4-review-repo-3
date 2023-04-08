import { Paper, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useContext, useState } from 'react'
import { userContext } from "./App";


function ClientCard(props){
    const user = useContext(userContext)
    const [showInvoices, setShowInvoices] = useState(false)

    const invoicesToDisplay = props.invoices.map(inv=>{
        if (inv.user_id === user.id){
        return <Grid item xs={12} id={inv.id} key={inv.id}>
                    <Typography variant="h6" component="h5">{inv.service_description}</Typography>
                    <Typography variant="subtitle1" component="h6">Cost: ${inv.cost}</Typography>
                    <Typography variant="subtitle1" component="h6">Date Invoice Sent: {inv.date_invoice_sent}</Typography>
                    <Typography variant="subtitle1" component="h6">Date Invoice Paid: {inv.date_invoice_paid === null ? "Not yet paid" : inv.date_invoice_paid}</Typography>
                </Grid>
        };
    });



    return(
        <Paper elevation={4}>
            <Typography variant="h5" component="h4">{props.name}</Typography>
            <Typography variant="subtitle1" component="h6">Point of Contact: {props.point_of_contact}</Typography>
            <Typography variant="subtitle2" component="h6">Email: {props.poc_email}</Typography>
            { invoicesToDisplay.filter(inv=>inv).length > 0 ? <Button onClick={()=>setShowInvoices(!showInvoices)}>{showInvoices ? "Hide Invoices" : "Show Invoices" }</Button> : "No Invoices to Display" }
            <Grid container >
                { showInvoices ? invoicesToDisplay : null }
            </Grid>
        </Paper>
    )
};


export default ClientCard;