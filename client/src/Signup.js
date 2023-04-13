import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

function Signup({ onLogin, errorData, setErrorData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      password_confirmation: passwordConfirm,
      email: email,
    };
    console.log("Before fetch: ", user);
    fetch("/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => onLogin(data));
        navigate("/home");
        setUsername("");
        setPassword("");
        setEmail("");
        setErrorData([]);
      } else res.json().then((data) => setErrorData(data.errors));
    });
  }

  const errorsToDisplay = errorData.map((error) => {
    return (
      <ul style={{ color: "red" }}>
        <li key={error}>{error}</li>
      </ul>
    );
  });

  return (
    <div>
      <Typography variant="h2" component="h2">
        This is the sign up page
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
          <Button variant="outlined" onClick={() => navigate("/signin")}>
            Already Have an Account?
          </Button>
        </Box>
      </Grid>

      {/* <h4>This is the sign UP page</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></input>
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          <input type="submit" name="submit"></input>
        </label>
      </form> */}
    </div>
  );
}

export default Signup;
