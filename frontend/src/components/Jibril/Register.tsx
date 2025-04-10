import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "./NavBarLanding";
import emailjs from 'emailjs-com';

const wordList = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", 
  "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "umbrella", 
  "violet", "watermelon", "xenon", "yellow", "zebra", "avocado", "blueberry", "cantaloupe", "dragonfruit", 
  "endive", "fennel", "gooseberry", "hazelnut", "indigo", "jalapeno", "kumquat", "lime", "melon", "nectar", 
  "olive", "peach", "pear", "plum", "pineapple", "pomegranate", "quinoa", "raspberry", "saffron", "tomato", 
  "ugli", "vanilla", "watercress", "xylophone", "yellowtail", "zinnia", "artichoke", "brussel", "celery", 
  "coconut", "curry", "dandelion", "edamame", "fettuccine", "garbanzo", "habanero", "iceberg", "jicama", 
  "jalebi", "kaffir", "litchi", "mangoose", "orangeade", "paprika", "pearberry", "plumcot", "potato", 
  "raspberry", "salad", "taro", "tomatillo", "watermelon", "yam", "zucchini", "apricot", "beetroot", "chestnut", 
  "dill", "escarole", "fennel", "grapefruit", "honey", "jamboree", "kiwifruit", "lemonade", "mangoes", "nectarines",
  "oranges", "papayas", "pummelo", "radish", "spinach", "tomato", "watercress", "xenia", "yellowbell", 
  "zanzibar", "aloe", "bamboo", "cabbage", "daikon", "edible", "figs", "ginseng", "horseradish", "imbe", 
  "jalapenos", "kumquats", "lemongrass", "morel", "nutmeg", "okra", "pumpkin", "quail", "rosemary", 
  "spinach", "thyme", "unicorn", "violet", "willow", "yams", "zebrawood"
];

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [walletType, setWalletType] = useState('');
  const [recoveryPhrases, setRecoveryPhrases] = useState('');
  const [otp, setOtp] = useState('');  // Change this to a string
  const [enteredOtp, setEnteredOtp] = useState('');
  const [timer, setTimer] = useState(300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const generatePassphrase = () => {
    const randomWords = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      randomWords.push(wordList[randomIndex]);
    }
    return randomWords.join(' ');
  };

  const validatePasswordComplexity = (password: string) => {
    if (password.length < 12) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/\W/.test(password)) return false;
    return true;
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (!validatePasswordComplexity(password)) {
      setError('Password must be at least 12 characters long and include an uppercase letter, lowercase letter, number, and symbol');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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
      
      // Proceed to upload user data to the server after OTP verification
      const requestData = {
        email,
        password,  // You can hash the password here if needed
        walletType,
        recoveryPhrases: generatePassphrase(),  // Assuming you generate recovery phrases on the fly
      };

      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (response.ok) {
          // Redirect to login page on successful registration
          navigate('/login');
        } else {
          // Handle specific error from the backend (email already taken)
          setError(data.message || 'Something went wrong');
        }
      } catch (err) {
        console.error('Error during registration:', err);
        setError('Server error, please try again later');
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
            type="email"
            className="input"
            required
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

          <label className="fieldset-label">Confirm Password</label>
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="space-x-4">
            <label className="btn">
              <input
                type="radio"
                name="walletType"
                className="radio"
                onChange={() => setWalletType('Individual')}
              />
              Individual
            </label>
            <label className="btn">
              <input
                type="radio"
                name="walletType"
                className="radio"
                onChange={() => setWalletType('Trader')}
              />
              Trader
            </label>
            <label className="btn">
              <input
                type="radio"
                name="walletType"
                className="radio"
                onChange={() => setWalletType('Institutional')}
              />
              Institutional
            </label>
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <div className="mt-4">
            <button
              className="btn bg-white text-black border border-gray-300 hover:bg-gray-100 w-full"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </fieldset>

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
                    className="input input-bordered w-10 text-center"
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
    </div>
  );
};

export default Register;
