/**
 * The `Login` component in React handles user login functionality, including form submission, error
 * handling, and loading state management.
 * @returns The `Login` component is being returned. It is a functional component that handles user
 * login functionality in a React application. The component contains form elements for email and
 * password input fields, a login button, and a link to the registration page. It also includes states
 * for email, password, loading status, and error handling. The `handleLogin` function is responsible
 * for handling the login process, making an
 */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(''); // Add error state to handle login errors
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate();

    const validateForm = () =>{
        let formError = {};
        let valid = true;
        if(!email){
            formError.email = 'Email is required';
            valid = false;
        } else if(!/\S+@\S+\.\S+/.test(email)){
            formError.email = 'Invalid email format';
            valid = false;
        }
        if(!password){
            formError.password = 'Password is required';
            valid = false;
        }
        setError(formErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!email && !password){
            setError('Please enter both email and password');
            return;
        }
        setLoading(true); // Set loading to true when the login process starts
        try {
            const response = await axios.post('/api/login', { email, password });
            // Handle Successful login
            let loginCount = parseInt(localStorage.getItem('loginCount')) || 0;
            loginCount += 1;
            localStorage.setItem('loginCount', loginCount);
            navigate('/profile');
        } catch (error) {
            console.error('Login Error', error);
            alert('Invalid email or password'); // You can replace this with a better UI error message
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    }

    return (
        <div className="auth-form">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
                <button type="submit" disabled={loading}> 
                    {loading ? 'Logging in...' : 'Login'} 
                </button> {/* Disable button while loading */}
                {loginError && <div className="error-message">{loginError}</div>}
                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    );
};

export default Login;
