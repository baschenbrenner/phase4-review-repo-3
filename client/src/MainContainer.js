import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { userContext } from "./App";
import { Typography } from "@mui/material";
import ClientsPage from "./ClientsPage";
import InvoicesPage from "./InvoicesPage";

function MainContainer({ errorData, setErrorData }){
    const user = useContext(userContext)
    const [clients, setClients] = useState([])
    const [userClients, setUserClients] = useState([])
    

    useEffect(()=>{
        fetch('/clients')
        .then(res=>res.json())
        .then(data=>setClients(data))
    }, []);

    useEffect(()=>{
        setUserClients(clients.filter(client=>{
            return client.invoices.filter(inv=>inv.user_id === user.id).length > 0
        }))
    }, [clients]);

    function handleDeleteInvoice(id){
        console.log("Invoice ID before state handling", id)

        const newClients = [...clients].map(client=>{
        const obj = {
            id: client.id,
            name: client.name,
            invoices: client.invoices.filter(inv=>inv.id !== parseInt(id)),
            poc_email: client.poc_email,
            point_of_contact: client.point_of_contact
        };
        return obj;
    });
    setClients(newClients)
}

function handleUpdateClient(res){
    console.log(res)
    const idx = [...clients].findIndex(client=>client.id === res.id)
    const newClients =[...clients];
    newClients.splice(idx, 1, res);
    setClients(newClients)
}

    

    return(
        <div id="main-container">
            <Typography variant="h1" component="h1">Freelance</Typography>
            <Typography variant="h5" component="h3">Welcome, {user.username}!</Typography>
            <Routes>
                <Route path="/home" element={<Typography variant="h5" component="h4">This is the HomePage</Typography >} />
                <Route path="/clients" element={<ClientsPage userClients={userClients} handleDeleteInvoice={handleDeleteInvoice} handleUpdateClient={handleUpdateClient} errorData={errorData} setErrorData={setErrorData}/>} />
                <Route path="/invoices" element={<InvoicesPage userClients={userClients} handleDeleteInvoice={handleDeleteInvoice} handleUpdateClient={handleUpdateClient} />} />
            </Routes>
        </div>
    )
};

export default MainContainer;