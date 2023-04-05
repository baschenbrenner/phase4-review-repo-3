import './App.css';
import { useState, useEffect } from 'react'
import Signin from './Signin';
import Signup from './Signup';
import Navbar from './Navbar';

function App() {

  const [user, setUser] = useState(null);

useEffect(()=>{
  fetch("/me").then(res => {
    if (res.ok){
      res.json().then(data=>setUser(data))
    }
  });
},[]);

function onLogout(res){
  setUser(res)
}



if (user){
  return <div className="App">
            <h1>FreeLance</h1>
            <h3>Welcome, {user.username}!</h3>
            <Navbar onLogout={onLogout}/>
          </div>
} else
  return <div>
            <Signin onLogin={setUser}/>
            <Signup />
          </div>
}

export default App;
