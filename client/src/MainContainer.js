import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { userContext } from "./App";
import { Typography } from "@mui/material";

function MainContainer(){
    const user = useContext(userContext)
    const [clients, setClients] = useState([])

    useEffect(()=>{
        fetch('/clients')
        .then(res=>res.json())
        .then(data=>setClients(data))
    }, []);

    console.log("Clients after signing in: ", clients)

    return(
        <div id="main-container">
            <Routes>
                {/* <Route exact path="/">
                    <Typography variant="h1" component="h1">Freelance</Typography>
                    <Typography variant="h5" component="h4">This is the MainContainer</Typography >
                </Route> */}
                <Route path="/home" element={<Typography variant="h1" component="h1">Freelance</Typography>} />
                <Route path="/home" element={<Typography variant="h5" component="h4">This is the MainContainer</Typography >} />
                <Route path="/home" element={<Typography variant="h3" component="h3">Welcome, {user.username}!</Typography>} />
                {/* <Route exact path="/clients">
                    <Typography variant="h3" component="h3">Welcome, {user.username}!</Typography>
                </Route> */}
            </Routes>
        </div>
    )
};

export default MainContainer;