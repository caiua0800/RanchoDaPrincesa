import React from "react";
import './styles/LoginPage.css'
import Login from "./Login";

export default function LoginPage({ setIsLoggedIn }) {

    return (
        <div className="LoginPage">
            <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}