// src/Login.js
import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithGoogle, db, collection, query, where, getDocs } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      // Search Firestore for the user ID
      const userId = await getUserIdByEmail(userEmail);
      if (userId) {
        setUserId(userId); // Set user ID in context
        navigate('/home'); // Redirect to home page
      } else {
        setError('User not found in database');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const userEmail = result.user.email;

      // Search Firestore for the user ID
      const userId = await getUserIdByEmail(userEmail);
      if (userId) {
        setUserId(userId); // Set user ID in context
        navigate('/home'); // Redirect to home page
      } else {
        setError('User not found in database');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getUserIdByEmail = async (email) => {
    console.log(email);
    const q = query(collection(db, 'et4s_main'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0]);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      console.log(userDoc.id);
      return userDoc.id;
    }
    return null;
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

