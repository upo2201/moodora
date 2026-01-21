import React, { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(true);
      navigate('/');
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="auth-container" style={{ background: '#FAFAF5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        <h1 style={{ fontFamily: 'Playfair Display', color: '#1A1A1A', margin: '0 0 0.5rem 0', fontSize: '3.5rem', letterSpacing: '-0.05em' }}>Moodora</h1>
        <h2 style={{ fontFamily: 'Lato', color: '#555', margin: 0, fontSize: '1.2rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Welcome Back</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ padding: '1rem', border: '1px solid #1A1A1A', background: 'transparent', fontFamily: 'Lato' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ padding: '1rem', border: '1px solid #1A1A1A', background: 'transparent', fontFamily: 'Lato' }}
            required
          />
          <button type="submit" style={{ padding: '0.8rem', background: '#1A1A1A', color: '#C5A059', border: 'none', cursor: 'pointer', fontFamily: 'Lato' }}>
            LOGIN
          </button>
        </form>
        <p style={{ marginTop: '1rem', fontFamily: 'Lato' }}>
          New here? <Link to="/register" style={{ color: '#1A1A1A', textDecoration: 'none' }}>Create an account</Link>
        </p>
        <p style={{ marginTop: '1rem', fontFamily: 'Lato' }}>
          <Link to="/" style={{ color: '#1A1A1A', textDecoration: 'none' }}>Back to Home</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
