import React, { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

import happy from './assets/happy.png';
import sad from './assets/sad.png';
import calm from './assets/calm.png';
import energetic from './assets/energetic.png';
import romantic from './assets/romantic.png';

const moods = [
  { name: 'Happy', img: happy },
  { name: 'Sad', img: sad },
  { name: 'Calm', img: calm },
  { name: 'Energetic', img: energetic },
  { name: 'Romantic', img: romantic },
];

const playlistSuggestions = {
  Happy: ['🎵 “Good as Hell” - Lizzo', '🎵 “Walking on Sunshine” - Katrina & the Waves'],
  Sad: ['🎵 “Someone Like You” - Adele', '🎵 “Let Her Go” - Passenger'],
  Calm: ['🎵 “Weightless” - Marconi Union', '🎵 “Sunset Lover” - Petit Biscuit'],
  Energetic: ['🎵 “Can’t Stop” - Red Hot Chili Peppers', '🎵 “Stronger” - Kanye West'],
  Romantic: ['🎵 “Perfect” - Ed Sheeran', '🎵 “All of Me” - John Legend'],
};

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setMoodHistory((prev) => [mood, ...prev.slice(0, 7)]);
  };

  return (
    <div className="App">
      <header>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          🎵 Moodora
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your mood-based music bestie 🎧
        </motion.p>
      </header>

      <AnimatePresence mode="wait">
        {!selectedMood ? (
          <motion.div
            key="mood-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>How are you feeling today?</h2>
            <div className="mood-buttons">
              {moods.map((mood) => (
                <motion.button
                  key={mood.name}
                  className="mood-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodClick(mood)}
                >
                  <img src={mood.img} alt={mood.name} className="mood-doodle" />
                  <span>{mood.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="playlist"
            className="playlist-section"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>🎧 Songs for when you’re feeling {selectedMood.name}</h2>
            <ul>
              {playlistSuggestions[selectedMood.name].map((track, idx) => (
                <motion.li key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {track}
                </motion.li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(null)}
            >
              ← Change Mood
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="moodboard"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>🧠 Your Moodboard</h2>
        <div className="mood-cards">
          {moodHistory.map((mood, index) => (
            <motion.div
              key={index}
              className="mood-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <img src={mood.img} alt={mood.name} />
              <p>{mood.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <footer>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Made with 💗 by Upolobdhi
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
