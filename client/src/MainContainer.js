import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { userContext } from "./App";
import { Typography } from "@mui/material";
import ClientsPage from "./ClientsPage";
import InvoicesPage from "./InvoicesPage";
import HomePage from "./HomePage";
import SignInSide from "./SignInSide";
import SignUpPage from "./SignUpPage";

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

function handleUpdateInvoice(res){
    console.log("res after fetch", res);
    const targetClient= [...clients].filter(client=>client.id === res.id)[0]
    const idx = targetClient.invoices.findIndex(inv=>inv.id === res.id);
    targetClient.invoices.splice(idx, 1, res);
    handleUpdateClient(targetClient);
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
                <Route path="/home" element={<HomePage userClients={userClients} />} />
                <Route path="/invoices" element={<InvoicesPage clients={clients} userClients={userClients} handleDeleteInvoice={handleDeleteInvoice} handleUpdateInvoice={handleUpdateInvoice}/>} />
                <Route path="/clients" element={<ClientsPage  clients={clients} userClients={userClients} handleDeleteInvoice={handleDeleteInvoice} handleUpdateClient={handleUpdateClient} errorData={errorData} setErrorData={setErrorData}/>} />
            </Routes>
        </div>
    )
};

export default MainContainer;