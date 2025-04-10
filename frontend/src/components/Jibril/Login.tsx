import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './NavBarLanding';
import emailjs from 'emailjs-com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [timer, setTimer] = useState(300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
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

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      // Send OTP via email using EmailJS
      const result = await emailjs.send(
        'service_lzi2n9r',   // Your Service ID
        'template_dv9m12y',  // Your Template ID
        { email, passcode: generatedOtp }, // Template Variables
        'UC5rwjavsYgkvA_ET'  // Your User ID
      );
      console.log("Generated OTP: ", generatedOtp); // Simulating OTP sent to the email
      setOtp(generatedOtp);  // Set OTP as a string
      setIsModalOpen(true);  // Open OTP modal

      // Start timer countdown
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        if (timer === 0) {
          clearInterval(interval);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send OTP. Try again later.');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/\d/.test(value) && value.length === 1) {
      setEnteredOtp(enteredOtp + value);  // Append the entered value
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    } else if (value === '') {
      setEnteredOtp(enteredOtp.slice(0, -1));  // Remove last character
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp === enteredOtp) {
      setIsVerified(true);
      setError('');

      // Proceed with the backend login after OTP verification
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && data.error === undefined) {
          localStorage.setItem('jwtToken', data.access_token);
          navigate('/Portfolio');  // Redirect to the portfolio page
        } else {
          setError(data.error || 'Invalid credentials');
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        console.error(err);
      }
    } else {
      setError('Invalid OTP');
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
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
        </fieldset>
      </div>

      {/* OTP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg space-y-4 w-80">
            <h2 className="text-l font-bold text-red-500">A 6-digit code has been sent to your email.</h2>

            <div className="flex space-x-2">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={enteredOtp[index] || ''}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="input input-bordered w-10 text-center text-white"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {timer > 0 ? (
              <p className="text-sm text-gray-500">Time remaining: {formatTime(timer)}</p>
            ) : (
              <p className="text-sm text-red-400">OTP Expired</p>
            )}

            {error && <p className="text-red-400">{error}</p>}

            <button
              onClick={handleVerifyOtp}
              className="btn bg-black text-white w-full"
              disabled={timer <= 0}
            >
              Verify OTP
            </button>

            {isVerified && <p className="text-green-400 mt-4">OTP Verified Successfully!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
