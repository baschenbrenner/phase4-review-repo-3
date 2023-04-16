import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Grid, Box, TextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

function Signin({ onLogin, errorData, setErrorData }) {
  const [usernameForm, setUsernameForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: usernameForm,
      password: passwordForm,
    };
    console.log("Before fetch: ", user);
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => onLogin(data));
        navigate("/home");
        setUsernameForm("");
        setPasswordForm("");
        setErrorData([]);
      } else res.json().then((data) => setErrorData([data.error]));
    });
  }

  const errorsToDisplay = errorData.map((error) => {
    return (
      <ul style={{ color: "red" }}>
        <li key={error}>{error}</li>
      </ul>
    );
  });

  function handleNavToSignUp(){
    navigate("/signup");
    setErrorData([]);
  }
  

  // Return of JSX
  return (
    <div>
      <Typography variant="h2" component="h2">
        This is the sign in page
      </Typography>

      <Grid container spacing={2} className="signin-form">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Username"
              value={usernameForm}
              onChange={(e) => setUsernameForm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              value={passwordForm}
              onChange={(e) => setPasswordForm(e.target.value)}
            />
          </Grid>
          {errorsToDisplay}
          <Fab
            onClick={handleSubmit}
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
          >
            <NavigationIcon sx={{ mr: 1 }} />
            Submit
          </Fab>
          <Button variant="outlined" onClick={handleNavToSignUp}>
            Create an account
          </Button>
        </Box>
      </Grid>
    </div>
  );
}

export default Signin;
