import React from 'react';
import './LoginPage.css'
import LogIn from "../../Components/LogIn/LogIn.jsx";

function LoginPage() {
    return (
        <div className='login-container'>
            <h1>Welcome Back</h1>
            <LogIn />
        </div>
    );
}

export default LoginPage;