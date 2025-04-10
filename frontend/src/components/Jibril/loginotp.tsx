import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './NavBarLanding';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    // Clear any previous error
    setError('');

    try {
      // Log to confirm the credentials being sent
      console.log('Sending credentials:', { email, password });

      // Make the POST request to the backend API
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Log the response for debugging
      const data = await response.json();
      console.log('Response from backend:', data);

      // Check if the response is successful
      if (response.ok && data.error === undefined) {
        // Handle successful login (you can store the token in localStorage or state)
        console.log('Login successful', data);
        localStorage.setItem('jwtToken', data.access_token);
        // Redirect the user after successful login
        navigate(`/Portfolio`)
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box space-y-2">
          <label className="fieldset-label">Email</label>
          <input
            type="text"
            className="input"
            placeholder="jon.snow@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-right mt-2">
            <a href="/forgot" className="text-sm text-blue-400 hover:underline">
              Forgot your password?
            </a>
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <div className="mt-4">
            <button
              className="btn bg-white text-black border border-gray-300 hover:bg-gray-100 w-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <div className="divider">OR</div>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
