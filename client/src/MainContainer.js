import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "./App";


function MainContainer(){
    const user = useContext(userContext)
    const [clients, setClients] = useState([])

    useEffect(()=>{
        fetch('/clients')
        .then(res=>res.json())
        .then(data=>setClients(data))
    }, []);


    return(
        <div>
            <h1>Freelance</h1>
            <h3>Welcome, {user.username}!</h3>
            <h4>This is the MainContainer</h4>
        </div>
    )
};

export default MainContainer;