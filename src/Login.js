import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
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
        <input type="submit" className='loginbtn' value="Log In" />
      </form>
      <div className="signup-link">
        <p>
          Don't have an account?
          <br />
          <a href="/#/signup">SIGN UP</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
