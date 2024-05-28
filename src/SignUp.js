import React, { useState } from 'react';
import './Login.css';

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          displayname,
          email,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message);
      } else {
        console.log(data.message); // Optionally handle success message
        onSignUp();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="containerr">
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
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignUp;
