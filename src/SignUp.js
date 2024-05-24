import React, { useState } from 'react';
import './Login.css';

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      alert('Username already exists');
    } else {
      const newUser = { username, password, displayname, email };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      onSignUp();
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
          type='text'
          id="displayname"
          name="displayname"
          placeholder="DisplayName..."
          value={displayname}
          onChange={(e) => setDisplayname(e.target.value)}
        />
        <input
          type="email"
          id="email"
          name="Email"
          placeholder="Email..."
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" className='loginbtn' value="Sign Up" />
      </form>
      <div className="signup-link">
        <p>
          Already have an account?
          <br />
          <a href="/#/login">LOG IN</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
