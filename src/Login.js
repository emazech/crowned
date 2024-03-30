import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="container">
            <span>Crowned</span>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                      </form>
                      <div className="signup-link">
                <input type="submit" className='loginbtn' value="Log In" />

                
                    <p>Don't have an account? 
                        <br></br><a href='#'>SIGN UP</a></p>
                </div>
        </div>
    );
}

export default Login;