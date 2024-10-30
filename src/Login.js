import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithGoogle, db, collection, query, where, getDocs } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleLogin = async (e) => {debugger;
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      const userId = await getUserIdByEmail(userEmail);
      if (userId) {
        const role = await checkIfAdmin(userEmail);
        setUserId(userId);
        navigate(role ? '/admin' : '/home');
      } else {
        const errorMsg = 'User not found in database';
        toast.error(errorMsg); // Show error in toast
      }
    } catch (err) {
      toast.error(err.message); // Show error in toast
    }
  };

  const handleAdminLogin = async (e) => {debugger;
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      const userId = await getUserIdByEmail(userEmail);
      if (userId) {
        const isAdmin = await checkIfAdmin(userEmail);
        if (isAdmin) {
          setUserId(userId);
          navigate('/admin');
        } else {
          const errorMsg = 'You are not authorized as an admin';
          toast.error(errorMsg); // Show error in toast
        }
      } else {
        const errorMsg = 'User not found in database';
        toast.error(errorMsg); // Show error in toast
      }
    } catch (err) {
      toast.error(err.message); // Show error in toast
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const userEmail = result.user.email;

      const userId = await getUserIdByEmail(userEmail);
      if (userId) {
        const role = await checkIfAdmin(userEmail);
        setUserId(userId);
        navigate(role ? '/admin' : '/home');
      } else {
        const errorMsg = 'User not found in database';
        toast.error(errorMsg); // Show error in toast
      }
    } catch (err) {
      toast.error(err.message); // Show error in toast
    }
  };

  const getUserIdByEmail = async (email) => {debugger;
    const q = query(collection(db, 'et4s_main'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    }
    return null;
  };

  const checkIfAdmin = async (userEmail) => {debugger;
    const q = query(collection(db, 'et4s_main'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().role === 'admin';
    }
    return false;
  };

  return (
    <div className="login_container">
      <ToastContainer
        position="bottom-right" // Position of the toast
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <div className="login_card">
        <h1 className="header">Login</h1>
        {error && <div className="error">{error}</div>}
        
        <div className="inputGroup">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        
        <button
          onClick={handleLogin}
          className="button emailButton"
        >
          Login as Student
        </button>
        <button
          onClick={handleAdminLogin}
          className="button adminButton"
        >
          Admin Login
        </button>
        <button
          onClick={handleSignInWithGoogle}
          className="button googleButton"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
