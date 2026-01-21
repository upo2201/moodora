import React, { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

import happy from './assets/happy.png';
import sad from './assets/sad.png';
import calm from './assets/calm.png';
import energetic from './assets/energetic.png';
import romantic from './assets/romantic.png';
import focused from './assets/focused.png';
import dreamy from './assets/dreamy.png';
import nostalgic from './assets/nostalgic.png';

const moods = [
  { name: 'Happy', img: happy, color: '#ff7675' },
  { name: 'Sad', img: sad, color: '#74b9ff' },
  { name: 'Calm', img: calm, color: '#55efc4' },
  { name: 'Energetic', img: energetic, color: '#ffeaa7' },
  { name: 'Romantic', img: romantic, color: '#fd79a8' },
  { name: 'Focused', img: focused, color: '#a29bfe' },
  { name: 'Dreamy', img: dreamy, color: '#81ecec' },
  { name: 'Nostalgic', img: nostalgic, color: '#fab1a0' },
];

const playlistSuggestions = {
  Happy: [
    { title: 'Good as Hell', artist: 'Lizzo', cover: 'https://placehold.co/60/ff7675/white?text=GH' },
    { title: 'Walking on Sunshine', artist: 'Katrina & the Waves', cover: 'https://placehold.co/60/ff7675/white?text=WS' },
    { title: 'Levitating', artist: 'Dua Lipa', cover: 'https://placehold.co/60/ff7675/white?text=LV' }
  ],
  Sad: [
    { title: 'Someone Like You', artist: 'Adele', cover: 'https://placehold.co/60/74b9ff/white?text=SY' },
    { title: 'Let Her Go', artist: 'Passenger', cover: 'https://placehold.co/60/74b9ff/white?text=LG' },
    { title: 'Fix You', artist: 'Coldplay', cover: 'https://placehold.co/60/74b9ff/white?text=FY' }
  ],
  Calm: [
    { title: 'Weightless', artist: 'Marconi Union', cover: 'https://placehold.co/60/55efc4/white?text=WL' },
    { title: 'Sunset Lover', artist: 'Petit Biscuit', cover: 'https://placehold.co/60/55efc4/white?text=SL' },
    { title: 'River Flows in You', artist: 'Yiruma', cover: 'https://placehold.co/60/55efc4/white?text=RF' }
  ],
  Energetic: [
    { title: 'Can’t Stop', artist: 'Red Hot Chili Peppers', cover: 'https://placehold.co/60/ffeaa7/white?text=CS' },
    { title: 'Stronger', artist: 'Kanye West', cover: 'https://placehold.co/60/ffeaa7/white?text=ST' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', cover: 'https://placehold.co/60/ffeaa7/white?text=UF' }
  ],
  Romantic: [
    { title: 'Perfect', artist: 'Ed Sheeran', cover: 'https://placehold.co/60/fd79a8/white?text=PF' },
    { title: 'All of Me', artist: 'John Legend', cover: 'https://placehold.co/60/fd79a8/white?text=AM' },
    { title: 'Just the Way You Are', artist: 'Bruno Mars', cover: 'https://placehold.co/60/fd79a8/white?text=JW' }
  ],
  Focused: [
    { title: 'Cornfield Chase', artist: 'Hans Zimmer', cover: 'https://placehold.co/60/a29bfe/white?text=CC' },
    { title: 'Time', artist: 'Hans Zimmer', cover: 'https://placehold.co/60/a29bfe/white?text=TM' },
    { title: 'Experience', artist: 'Ludovico Einaudi', cover: 'https://placehold.co/60/a29bfe/white?text=EX' }
  ],
  Dreamy: [
    { title: 'Midnight City', artist: 'M83', cover: 'https://placehold.co/60/81ecec/white?text=MC' },
    { title: 'Space Song', artist: 'Beach House', cover: 'https://placehold.co/60/81ecec/white?text=SS' },
    { title: 'Heroes', artist: 'David Bowie', cover: 'https://placehold.co/60/81ecec/white?text=HR' }
  ],
  Nostalgic: [
    { title: 'Take on Me', artist: 'a-ha', cover: 'https://placehold.co/60/fab1a0/white?text=TM' },
    { title: 'Africa', artist: 'Toto', cover: 'https://placehold.co/60/fab1a0/white?text=AF' },
    { title: 'Bohemian Rhapsody', artist: 'Queen', cover: 'https://placehold.co/60/fab1a0/white?text=BR' }
  ],
};

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setMoodHistory((prev) => [mood, ...prev.slice(0, 7)]);
  };

  return (
    <div className="App">
      <header>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          🎵 Moodora
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <h2>How are you feeling today?</h2>
            <div className="mood-buttons">
              {moods.map((mood) => (
                <motion.button
                  key={mood.name}
                  className="mood-button"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodClick(mood)}
                  style={{ borderColor: mood.color }}
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
            transition={{ duration: 0.5, type: "spring" }}
          >
            <h2>🎧 Songs for when you’re feeling {selectedMood.name}</h2>
            <ul>
              {playlistSuggestions[selectedMood.name]?.map((track, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img src={track.cover} alt="cover" style={{ width: 50, height: 50, borderRadius: 8, marginRight: 15 }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{track.title}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{track.artist}</div>
                  </div>
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2>🧠 Your Moodboard</h2>
        <div className="mood-cards">
          {moodHistory.map((mood, index) => (
            <motion.div
              key={index}
              className="mood-card"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, type: "spring" }}
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
