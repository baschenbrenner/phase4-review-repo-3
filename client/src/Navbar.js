import React from "react";
import { useState } from "react";

function Navbar({ onLogout }){

    function handleSignOutClick(){
        fetch('/logout', {
            method: "DELETE"
        }).then(onLogout())
    };

    return(
        <div>
            <button onClick={handleSignOutClick}>SIGN OUT</button>
        </div>
    )
};

export default Navbar;