import React from "react";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email
    };
    console.log("Before fetch: ", user);
    fetch("/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("RES: ", data))
      .catch((err) => console.log("errors: ", err));
      setUsername("");   
      setPassword("");   
      setEmail("");   
  }

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
      </form>
    </div>
  );
}

export default Signup;
