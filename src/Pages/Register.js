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
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            setError('All fields are required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email address format');
            return;
        }
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
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    )
}

export default Register;