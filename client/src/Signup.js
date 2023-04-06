import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Signup({ onLogin, errorData, setErrorData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [email, setEmail] = useState("");
  const navigate= useNavigate();

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
        setUsername("");
        setPassword("");
        setEmail("");
        setErrorData([])
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
      <h4>This is the sign UP page</h4>
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
        {errorsToDisplay}
        <label>
          <input type="submit" name="submit"></input>
        </label>
      </form>
      <Button variant="outlined" onClick={()=>navigate("/signin")}>Already Have an Account?</Button>
    </div>
  );
}

export default Signup;
