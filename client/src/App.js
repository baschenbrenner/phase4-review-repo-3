import './App.css';
import { useState, useEffect } from 'react'
import Signin from './Signin';

function App() {

  const [user, setUser] = useState(null);

useEffect(()=>{
  fetch("/me").then(res => {
    if (res.ok){
      res.json().then(data=>setUser(data))
    }
  });
},[]);



if (user){
  return <div className="App">
            <h1>FreeLance</h1>
            <h3>Welcome, {user.username}!</h3>
          </div>
} else
  return <Signin onLogin={setUser}/>
}

export default App;
