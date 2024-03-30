import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
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
                {!isLogin && (
                    <input
                        type='text'
                        id="displayname"
                        name="displayname"
                        placeholder="DisplayName..."
                        value={displayname}
                        onChange={(e) => setDisplayname(e.target.value)}
                    />
                )}
                {!isLogin && (
                <input
                    type="email"
                    id="email"
                    name="Email"
                    placeholder="Email..."
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                )}
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" className='loginbtn' value={isLogin ? "Log In" : "Sign Up"} />
            </form>
            <div className="signup-link">
                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <br />
                    <a href='#' onClick={toggleForm}>{isLogin ? "SIGN UP" : "LOG IN"}</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
