import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./Signin";
import SignInSide from "./SignInSide";
import Signup from "./Signup";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
import { Button } from "@mui/material";

export const userContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [errorData, setErrorData] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => setUser(data));
      } else{
        navigate('/signin');
      }
    });
  }, []);

  function onLogout(res) {
    setUser(res);
  }

  // Return of JSX (dependant on Login of User-State)
  if (user) {
    return (
      <div className="App">
        <userContext.Provider value={user}>
          <Navbar onLogout={onLogout} />
          <MainContainer errorData={errorData} setErrorData={setErrorData}/>
        </userContext.Provider>
      </div>
    );
  } else
    return (
      <Routes>
        <Route
          path="/signin"
          element={
            <SignInSide
              onLogin={setUser}
              errorData={errorData}
              setErrorData={setErrorData}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              onLogin={setUser}
              errorData={errorData}
              setErrorData={setErrorData}
            />
          }
        />
      </Routes>
    );
}

export default App;
