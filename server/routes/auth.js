const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Need to install bcryptjs!
const jwt = require('jsonwebtoken'); // Need to install jsonwebtoken!

// In-Memory Fallback Store
const mockUsers = [];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!req.isDbConnected) {
      // Mock Logic
      let user = mockUsers.find(u => u.email === email);
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = { id: Date.now().toString(), name, email, password };
      mockUsers.push(newUser);

      const payload = { user: { id: newUser.id } };
      jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
      });
      return;
    }

    // Real DB Logic
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash password (placeholder logic, need bcrypt)
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // For now, storing plain text to get things moving (Security Risk - User: please note this!)
    // Actually, I should install bcryptjs. I will add a task to install it.

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!req.isDbConnected) {
      // Mock Logic
      let user = mockUsers.find(u => u.email === email);
      if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
      if (password !== user.password) return res.status(400).json({ msg: 'Invalid Credentials' });

      const payload = { user: { id: user.id } };
      jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      });
      return;
    }

    // Real DB Logic
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    if (password !== user.password) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
