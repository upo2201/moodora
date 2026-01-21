const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/MoodEntry');

// In-Memory Fallback Store
const mockMoods = [];

// Get All Moods for User (Needs Auth Middleware in future)
router.get('/:userId', async (req, res) => {
  try {
    if (!req.isDbConnected) {
      const moods = mockMoods.filter(m => m.user === req.params.userId).sort((a, b) => b.timestamp - a.timestamp);
      return res.json(moods);
    }

    const moods = await MoodEntry.find({ user: req.params.userId }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add Mood
router.post('/', async (req, res) => {
  try {
    const { userId, mood, note } = req.body;

    if (!req.isDbConnected) {
      const newMood = {
        user: userId,
        mood,
        note,
        timestamp: new Date()
      };
      mockMoods.push(newMood);
      return res.json(newMood);
    }

    const newMood = new MoodEntry({
      user: userId,
      mood,
      note
    });
    const savedMood = await newMood.save();
    res.json(savedMood);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
