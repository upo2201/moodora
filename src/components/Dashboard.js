import React, { useState, useEffect } from 'react';
import api from '../api';
import '../App.css';
import Chat from './Chat';
import { motion, AnimatePresence } from 'framer-motion';

import happy from '../assets/happy.png';
import sad from '../assets/sad.png';
import calm from '../assets/calm.png';
import energetic from '../assets/energetic.png';
import romantic from '../assets/romantic.png';
import focused from '../assets/focused.png';
import dreamy from '../assets/dreamy.png';
import nostalgic from '../assets/nostalgic.png';

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
    { title: 'Good as Hell', artist: 'Lizzo' },
    { title: 'Walking on Sunshine', artist: 'Katrina & the Waves' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'Happy', artist: 'Pharrell Williams' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
    { title: 'Can’t Stop the Feeling!', artist: 'Justin Timberlake' }
  ],
  Sad: [
    { title: 'Someone Like You', artist: 'Adele' },
    { title: 'Let Her Go', artist: 'Passenger' },
    { title: 'Fix You', artist: 'Coldplay' },
    { title: 'Stay With Me', artist: 'Sam Smith' },
    { title: 'Skinny Love', artist: 'Bon Iver' },
    { title: 'when the party\'s over', artist: 'Billie Eilish' }
  ],
  Calm: [
    { title: 'Weightless', artist: 'Marconi Union' },
    { title: 'Sunset Lover', artist: 'Petit Biscuit' },
    { title: 'River Flows in You', artist: 'Yiruma' },
    { title: 'Clair de Lune', artist: 'Claude Debussy' },
    { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie' }
  ],
  Energetic: [
    { title: 'Can’t Stop', artist: 'Red Hot Chili Peppers' },
    { title: 'Stronger', artist: 'Kanye West' },
    { title: 'Titanium', artist: 'David Guetta ft. Sia' },
    { title: 'Wake Me Up', artist: 'Avicii' },
    { title: 'Mr. Brightside', artist: 'The Killers' },
    { title: 'Don\'t Stop Me Now', artist: 'Queen' }
  ],
  Romantic: [
    { title: 'Perfect', artist: 'Ed Sheeran' },
    { title: 'All of Me', artist: 'John Legend' },
    { title: 'Just the Way You Are', artist: 'Bruno Mars' },
    { title: 'At Last', artist: 'Etta James' },
    { title: 'Fly Me to the Moon', artist: 'Frank Sinatra' },
    { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley' }
  ],
  Focused: [
    { title: 'Cornfield Chase', artist: 'Hans Zimmer' },
    { title: 'Time', artist: 'Hans Zimmer' },
    { title: 'Experience', artist: 'Ludovico Einaudi' },
    { title: 'Cello Suite No. 1', artist: 'J.S. Bach' },
    { title: 'On the Nature of Daylight', artist: 'Max Richter' },
    { title: 'Avril 14th', artist: 'Aphex Twin' }
  ],
  Dreamy: [
    { title: 'Midnight City', artist: 'M83' },
    { title: 'Space Song', artist: 'Beach House' },
    { title: 'Heroes', artist: 'David Bowie' },
    { title: 'The Less I Know The Better', artist: 'Tame Impala' },
    { title: 'Dreams', artist: 'Fleetwood Mac' },
    { title: 'Cherry-coloured Funk', artist: 'Cocteau Twins' }
  ],
  Nostalgic: [
    { title: 'Take on Me', artist: 'a-ha' },
    { title: 'Africa', artist: 'Toto' },
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'September', artist: 'Earth, Wind & Fire' },
    { title: 'Everybody Wants to Rule the World', artist: 'Tears for Fears' },
    { title: 'Hotel California', artist: 'Eagles' }
  ],
};

const quotes = {
  Happy: "Happiness is the ultimate luxury.",
  Sad: "Tears are the noble language of the eye.",
  Calm: "Silence is a true friend who never betrays.",
  Energetic: "Energy is the currency of the soul.",
  Romantic: "Love is a friendship set to music.",
  Focused: "Focus is the art of exclusion.",
  Dreamy: "Dreams are the illustrations from the book your soul is writing.",
  Nostalgic: "Nostalgia is a file that removes the rough edges from the good old days."
};



// ... (imports remain)



const Dashboard = ({ setAuth }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [currentTracks, setCurrentTracks] = useState([]);

  useEffect(() => {
    // ... (existing loadData logic) ...
    // Load User and Mood History
    const loadData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
        try {
          const res = await api.get(`/moods/${storedUser.id}`);
          const formattedHistory = res.data.map(item => {
            const moodObj = moods.find(m => m.name === item.mood);
            return moodObj || { name: item.mood, img: null };
          });
          setMoodHistory(formattedHistory);
        } catch (err) {
          console.error("Failed to load moods");
        }
      }
    };
    loadData();
  }, []);

  // ... (existing handlers)

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    // Shuffle and pick 3 random songs
    const allTracks = playlistSuggestions[mood.name] || [];
    const shuffled = [...allTracks].sort(() => 0.5 - Math.random()).slice(0, 3);
    setCurrentTracks(shuffled);

    setMoodHistory((prev) => [mood, ...prev.slice(0, 7)]);
    if (user) {
      try {
        await api.post('/moods', { userId: user.id, mood: mood.name, note: `Feeling ${mood.name}` });
      } catch (err) { console.error("Failed to save mood"); }
    }
  };

  const shuffleSongs = () => {
    if (!selectedMood) return;
    const allTracks = playlistSuggestions[selectedMood.name] || [];
    const shuffled = [...allTracks].sort(() => 0.5 - Math.random()).slice(0, 3);
    setCurrentTracks(shuffled);
  }

  // ... (render)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
  };

  return (
    <div className="Dashboard">
      <header>
        {/* ... (existing header content) ... */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          Moodora
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Define Your Vibe
        </motion.p>
        <button onClick={handleLogout} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: '1px solid #1A1A1A', padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Lato' }}>
          LOGOUT
        </button>
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
            <div className="mood-buttons">
              {moods.map((mood) => (
                <motion.button
                  key={mood.name}
                  className="mood-button"
                  whileHover={{ scale: 1.05 }}
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
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>"{quotes[selectedMood.name]}"</h2>
              <p style={{ fontSize: '0.9rem', color: '#555', fontStyle: 'italic' }}>Curated for your {selectedMood.name} soul</p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              {currentTracks.map((track, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1rem', borderBottom: '1px solid #E0E0E0',
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>{track.title}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8, fontFamily: 'Lato' }}>{track.artist}</div>
                  </div>
                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(track.title + " " + track.artist)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem', borderRadius: '20px',
                      background: '#1DB954', color: 'white', textDecoration: 'none',
                      fontSize: '0.8rem', fontWeight: 'bold'
                    }}
                  >
                    Play on Spotify 🟢
                  </a>
                </motion.li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleSongs}
                style={{
                  background: 'transparent', border: '1px solid #1A1A1A',
                  color: '#1A1A1A', padding: '0.8rem 1.5rem', cursor: 'pointer', fontFamily: 'Lato'
                }}
              >
                ↻ Shuffle Songs
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(null)}
                style={{
                  background: '#1A1A1A', border: 'none',
                  color: '#C5A059', padding: '0.8rem 1.5rem', cursor: 'pointer', fontFamily: 'Lato'
                }}
              >
                ← Change Mood
              </motion.button>
            </div>
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
        {moodHistory.length > 0 && (
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #C5A059', borderRadius: '8px', maxWidth: '300px', margin: '2rem auto' }}>
            <h3 style={{ fontFamily: 'Playfair Display', margin: '0 0 0.5rem 0' }}>Your Vibe Check</h3>
            <p style={{ fontFamily: 'Lato', fontSize: '0.9rem' }}>
              You've been feeling mostly <strong style={{ color: '#C5A059' }}>{
                mode(moodHistory.map(m => m.name))
              }</strong> lately.
            </p>
          </div>
        )}
      </motion.div>

      {/* Chat Interface Integration */}
      <AnimatePresence>
        {showChat && <Chat onClose={() => setShowChat(false)} moodSuggestions={playlistSuggestions} />}
      </AnimatePresence>

      {!showChat && (
        <motion.button
          onClick={() => setShowChat(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: '#1A1A1A', color: '#C5A059', border: '1px solid #C5A059',
            fontSize: '1.5rem', cursor: 'pointer', zIndex: 999,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          💬
        </motion.button>
      )}

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
};

// Helper to find most frequent mood
function mode(arr) {
  return arr.sort((a, b) =>
    arr.filter(v => v === a).length
    - arr.filter(v => v === b).length
  ).pop();
}

export default Dashboard;
