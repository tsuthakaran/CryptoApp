import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "./NavBarLanding";

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
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Function to generate a 12-word passphrase
  const generatePassphrase = () => {
    const randomWords = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      randomWords.push(wordList[randomIndex]);
    }
    return randomWords.join(' ');
  };
  const validatePasswordComplexity = (password: string) => {
    if (password.length < 12) {
      console.log("Password too short, must be at least 12 characters");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/\d/.test(password)) {
      return false;
    }
    if (!/\W/.test(password)){
      return false;
    }
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

    const requestData = {
      email,
      password,
      walletType,
      recoveryPhrases: generatePassphrase(), // Generate passphrase here
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
      </div>
    </div>
  );
};

export default Register;