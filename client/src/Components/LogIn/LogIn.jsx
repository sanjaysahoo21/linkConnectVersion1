import React from 'react';
import { useState } from 'react';
import './LogIn.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function LogIn() {
    const [login, setLogin] = useState(
        {
            email: '',
            password: '',
        }
    );
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogin({...login,[name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('login:', login.email);
        try {
            const url = 'http://localhost:5000/api/auth';
            const{data:res} = await axios.post(url, login);

            console.log('response:', res);

            localStorage.setItem('token', res.data);
            localStorage.setItem('user', res.role);
            localStorage.setItem('username', `${res.firstName} ${res.lastName}`);

            console.log('User role:', res.role);

            if (res.role === 'student') {
                console.log('Redirecting to student home');
                navigate('/student/home');
            } else if (res.role === 'faculty') {
                console.log('Redirecting to faculty home');
                navigate('/faculty/home');
            } else if (res.role === 'admin') {
                console.log('Redirecting to admin home');
                navigate('/admin/home');
            } else {
                console.log('Unknown role, redirecting to login page');
                navigate('/');
            }
        } catch(error) {
            // Check if error.response exists before accessing its properties
            if(error.response && error.response.status >= 400 && error.response.status < 500) {
                setErrors(error.response.data.message);
            } else {
                setErrors("Server not reachable. Try again later.");
                console.error(error);
            }
        }
    }
    return (
        <section className='login-section'>
            <div className='login-heading'>
                <h1>Log In</h1>
            </div>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Email' name={'email'} value={login.email} required={true} onChange={handleChange}/>
                    <input type='password' placeholder='password' name={'password'} value={login.password} required={true} onChange={handleChange}/>
                    {errors && <p className='error-message'>{errors}</p>}
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
            </div>
        </section>
    );
}

export default LogIn;