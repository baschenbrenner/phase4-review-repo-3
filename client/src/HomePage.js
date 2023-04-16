import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, Button, Paper, Link } from "@mui/material";

function HomePage({ userClients }){
    const [openInvoiceBalance, setOpenInvoiceBalance] = useState([]);
    const navigate =  useNavigate();


    useEffect(()=>{
        let balance = 0;
        userClients.forEach(client=>{
            client.invoices.forEach(inv=>{
                if(inv.date_invoice_paid === null){
                   balance = balance + inv.cost
                }
            })
        })
        setOpenInvoiceBalance(balance)
    }, [userClients]);

    function displayCosts(int) {
        const num_parts = int.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      }


    return(
        <div>
            <Grid container >
                <Grid item xs={12}>
                    <Paper elevation={4}>
                        <Typography variant="h3" component="h3" > Open Invoices</Typography>
                        <Typography variant="h4" component="h4" > ${displayCosts(openInvoiceBalance)}</Typography>
                        <Button variant="text" onClick={()=>navigate('/invoices')}>See All Invoices</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
};

export default HomePage;