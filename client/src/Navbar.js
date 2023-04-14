// import { useState } from "react";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
// import Menu from '@mui/material';
// import AppBar from '@mui/material';
// import MenuItem from '@mui/material';
// import Box from '@mui/material';
// import Container from '@mui/material';
// import Toolbar from '@mui/material';
// import Typography from '@mui/material';

function NavBar({ onLogout }) {

  const navigate =  useNavigate();

    function handleSignOutClick(){
        fetch('/logout', {
            method: "DELETE"
        }).then(onLogout())
        navigate('/signin')
    };

  return (
    // <AppBar position="static">
      <div>
        <Button onClick={()=>navigate('/home')} variant="outlined">Home</Button>
        <Button onClick={()=>navigate('/invoices')} variant="outlined">Invoices</Button>
        <Button onClick={()=>navigate('/clients')} variant="outlined">Clients</Button>
        <Button onClick={handleSignOutClick} variant="contained">Logout</Button>
      </div>
    // </AppBar>
  );
}
export default NavBar;