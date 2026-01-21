import React, { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ setAuth }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(true);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Error registering');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="auth-container" style={{ background: '#FAFAF5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        <h1 style={{ fontFamily: 'Playfair Display', color: '#1A1A1A', margin: '0 0 0.5rem 0', fontSize: '3.5rem', letterSpacing: '-0.05em' }}>Moodora</h1>
        <h2 style={{ fontFamily: 'Lato', color: '#555', margin: 0, fontSize: '1.2rem', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Join the Club</h2>
      </motion.div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ padding: '1rem', border: '1px solid #1A1A1A', background: 'transparent', fontFamily: 'Lato' }}
          required
        />
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
          SIGN UP
        </button>
      </form>
      <p style={{ marginTop: '1rem', fontFamily: 'Lato' }}>
        Already have an account? <Link to="/login" style={{ color: '#1A1A1A', textDecoration: 'none' }}>Log in</Link>
      </p>
    </motion.div>
  );
};

export default Signup;
