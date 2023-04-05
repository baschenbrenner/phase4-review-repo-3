import "./App.css";
import { useState, useEffect, createContext } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";

export const userContext = createContext(null);

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((data) => setUser(data));
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
        <userContext.Provider value={user} >
          <Navbar onLogout={onLogout} />
          <MainContainer />
        </userContext.Provider>
      </div>
    );
  } else
    return (
      <div>
        <Signin onLogin={setUser} />
        <Signup onLogin={setUser} />
      </div>
    );
}

export default App;
