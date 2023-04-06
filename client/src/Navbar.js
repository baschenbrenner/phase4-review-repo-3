// import { useState } from "react";
import * as React from 'react';

function NavBar({ onLogout }) {

    function handleSignOutClick(){
        fetch('/logout', {
            method: "DELETE"
        }).then(onLogout())
    };

  

  return (
    <div>
        <button onClick={handleSignOutClick}>Logout</button>
    </div>
  );
}
export default NavBar;