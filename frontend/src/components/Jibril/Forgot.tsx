import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './NavBarLanding';
import emailjs from 'emailjs-com';

const ForgotPassword = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [method, setMethod] = useState<'otp' | 'phrase' | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(300);
  const [step, setStep] = useState<'choose' | 'otp' | 'phrase'>('choose');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [storedOtp, setStoredOtp] = useState('');
  const [backupPhrase, setBackupPhrase] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');
    setOtpSent(true);
    setTimer(300);

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      // Send OTP via email using EmailJS (same as login)
      await emailjs.send(
        'service_lzi2n9r',
        'template_dv9m12y',
        { email, passcode: generatedOtp }, // Match login template variables
        'UC5rwjavsYgkvA_ET'
      );
      console.log("Generated OTP: ", generatedOtp);
      setStoredOtp(generatedOtp);

      // Start timer countdown
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send OTP. Try again later.');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/\d/.test(value) && value.length === 1) {
      setEnteredOtp(enteredOtp + value);
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`)?.focus();
      }
    } else if (value === '') {
      setEnteredOtp(enteredOtp.slice(0, -1));
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (storedOtp === enteredOtp) {
      try {
        // Request the backend to generate a reset token
        const response = await fetch('http://localhost:3000/auth/generate-reset-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate reset token');
        }
  
        const data = await response.json();
        const token = data.token; // Token from backend response
  
        // Redirect to reset password page with token in URL
        navigate(`/reset-password?token=${token}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Failed to generate reset token. Please try again.');
      }
    } else {
      setError('Invalid OTP');
    }
  };
  

  // Rest of your backup phrase handler remains the same
  const handleVerifyBackupPhrase = async () => { /* ... */ };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-base-200 p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Forgot your password?</h2>

          {step === 'choose' && (
            <>
              <p className="mb-4">Choose a recovery method:</p>
              <button
                className="btn w-full mb-2"
                onClick={() => {
                  setMethod('otp');
                  setStep('otp');
                }}
              >
                Recover via Email OTP
              </button>
              <button
                className="btn w-full"
                onClick={() => {
                  setMethod('phrase');
                  setStep('phrase');
                }}
              >
                Use Backup Phrase
              </button>
            </>
          )}

          {step === 'otp' && (
            <>
              <label>Email</label>
              <input
                type="text"
                className="input w-full mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {otpSent ? (
                <>
                  <p className="mb-4">A 6-digit code has been sent to your email.</p>
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
                  <p className="text-sm text-gray-500 mt-2">
                    Time remaining: {formatTime(timer)}
                  </p>
                  {error && <p className="text-red-500 mt-4">{error}</p>}

                  <button
                    className="btn bg-white text-black w-full mt-4"
                    onClick={handleVerifyOtp}
                    disabled={timer <= 0}
                  >
                    Verify OTP
                  </button>
                </>
              ) : (
                <button
                  className="btn bg-white text-black w-full mt-4"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              )}
            </>
          )}

          {/* Backup phrase section remains unchanged */}
          {step === 'phrase' && (
            <>
              <label>Backup Phrase</label>
              <input
                type="text"
                className="input w-full mb-2"
                placeholder="Enter your backup phrase"
                value={backupPhrase}
                onChange={(e) => setBackupPhrase(e.target.value)}
              />
              <button
                className="btn bg-white text-black w-full"
                onClick={handleVerifyBackupPhrase}
              >
                Verify Phrase
              </button>

              <button
                className="btn w-full mt-4"
                onClick={() => {
                  setMethod('otp');
                  setStep('otp');
                }}
              >
                Switch to OTP Recovery
              </button>
            </>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;