import React, {useState} from 'react';
import './Signup.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

function Signup() {
    const [signup, setSignup] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    )
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setSignup({...signup, [name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:5000/api/users';
            const{data:res} = await axios.post(url, signup);
            navigate('/login');
            console.log(res.message);
        } catch(error) {
            if(error.response.status >= 400 && error.response.status < 500) {
                setErrors(error.response.data.message);
            }else {
                setErrors("Server not reachable. Try again later.");
                console.error(error);
            }
        }
    }
    return (
        <section className='signup-section'>
            <div className='signup-heading'>
                <h1>Sign Up</h1>
            </div>
            <div className='signup-form'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='First Name' name={'firstName'} value={signup.firstName} onChange={handleChange} required={true}/>
                    <input type='text' placeholder='Last Name' name={'lastName'} value={signup.lastName} onChange={handleChange} required={true}/>
                    <input type='text' placeholder='Email' name={'email'} value={signup.email} onChange={handleChange} required={true}/>
                    <input type='password' placeholder='password' name={'password'} value={signup.password} onChange={handleChange} required={true}/>
                    {errors && <p className='error-message'>{errors}</p>}
                    <button type='submit'>Sign Up</button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </section>
    );
}

export default Signup;