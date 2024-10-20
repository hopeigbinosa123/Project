/**
 * The Register component in this code snippet handles user registration by capturing user input for
 * name, email, and password, validating the input, and making a POST request to a specified API
 * endpoint.
 * @returns The `Register` component is being returned. It is a functional component that contains a
 * form for user registration with fields for name, email, and password. The component also includes
 * error handling for required fields and email format validation. The form submission is handled by
 * the `handleRegister` function, which makes a POST request to a local API endpoint for user
 * registration.
 */

import React, {useState} from "react";
import axios from "axios";
import '../styles/Auth.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState({});
    const [registerError, setRegisterError] = useState('')

    const validateForm = () => {
        let formErrors = {};
        let valid = true;
        if(!name){
            formErrors.name = "Name is required";
            valid = false;
        }
        if(!email){
            formErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)){
            formErrors.email = "Invalid email format";
            valid = false;
        }
        if(!password){
            formErrors.password = "Password is required";
            valid = false;
        } else if(password.length < 6){
            formErrors.password = "Password must be at least 6 characters long";
            valid = false;
        }
        setErrors(formErrors);
        return valid;
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/users', {email, password, name});
            console.log(response.data);
        }catch{
            console.error('Error registering user');
        }
    }
    return(
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                {error.name && <div className="error-message">{error.name}</div>}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {error.email && <div className="error-message">{error.email}</div>}
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {error.password && <div className="error-message">{error.password}</div>}
                <button type="submit">Register</button>
                {registerError && <div className="error-message">{registerError}</div>}
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    )
}

export default Register;