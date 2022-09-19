import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        // API CALL
        const response = await fetch(`http://localhost:4000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json){
            localStorage.setItem('token',json.authtoken);
            history.push('/');
            props.showAlert('Logged in successfully!', 'success');
        }
        else{
            props.showAlert('Invalid credentials!', 'danger');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-5'>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="email" value={credentials.email} onChange={onChange} autoComplete="on" />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} autoComplete="on" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login;