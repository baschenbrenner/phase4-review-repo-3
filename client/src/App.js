import "./App.css";
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignInSide from "./SignInSide";
import SignUpPage from "./SignUpPage";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";

export const userContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [errorData, setErrorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Before Fetch")

    fetch("/me")
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => setUser(data));
      } else {
        navigate("/signin");
      }
    });
    console.log("After Fetch")
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
          <MainContainer errorData={errorData} setErrorData={setErrorData} />
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
            <SignUpPage
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
