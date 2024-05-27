import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const loggedUser = { id: data.user.id, name: data.user.displayname };
        const userToken = { token: data.user.remember_token };
        const userid = data.user.id;
        localStorage.setItem("user", JSON.stringify(loggedUser));
        Cookies.set('userToken', userToken.token, { expires: 7 });
        localStorage.setItem("userid", userid);
        console.log("response", loggedUser);
        
        // Navigate to the desired route
        navigate('/TimedCC');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
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
        {error && <p className="error">{error}</p>}
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
