// src/Login.js
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('user', userCredential.user.uid); // Save user ID or token
      navigate('/home'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      localStorage.setItem('user', result.user.uid); // Save user ID or token
      navigate('/home'); // Redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Login</h1>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button
          onClick={handleLogin}
          style={{ ...styles.button, ...styles.emailButton }}
        >
          Login with Email
        </button>
        <button
          onClick={handleSignInWithGoogle}
          style={{ ...styles.button, ...styles.googleButton }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #000000, #4a148c, #00274d)',
  },
  card: {
    width: '400px',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  error: {
    marginBottom: '20px',
    color: 'red',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    color: 'black',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  emailButton: {
    backgroundColor: '#4a148c',
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#db4437',
    color: '#fff',
  },
};

export default Login;
