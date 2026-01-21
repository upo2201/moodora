import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css'; // Re-use main styles

const Chat = ({ onClose, moodSuggestions }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello darling. Tell me, how does your soul feel today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const response = generateResponse(inputText); // Logic function
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.text, sender: 'bot', recommendation: response.recommendation }]);
    }, 1000);
  };

  const generateResponse = (input) => {
    const lower = input.toLowerCase();

    // Simple Keyword Logic (Expandable)
    if (lower.includes('sad') || lower.includes('cry') || lower.includes('lonely') || lower.includes('breakup')) {
      return {
        text: "Oh, I sense a heavy heart. Sometimes a good melody is the only embrace we need. Try this...",
        recommendation: moodSuggestions['Sad']
      };
    }
    if (lower.includes('party') || lower.includes('dance') || lower.includes('happy') || lower.includes('excited')) {
      return {
        text: "Selection? Exquisite. Let's celebrate life's grandeur.",
        recommendation: moodSuggestions['Happy']
      };
    }
    if (lower.includes('study') || lower.includes('work') || lower.includes('focus') || lower.includes('busy')) {
      return {
        text: "Ambition looks good on you. Let's sharpen that focus.",
        recommendation: moodSuggestions['Focused']
      };
    }
    if (lower.includes('love') || lower.includes('date') || lower.includes('romantic')) {
      return {
        text: "Romance is in the air. Let the music whisper what words cannot.",
        recommendation: moodSuggestions['Romantic']
      };
    }
    if (lower.includes('tired') || lower.includes('sleep') || lower.includes('calm') || lower.includes('stress')) {
      return {
        text: "Rest is a luxury you deserve. Breathe in... and listen.",
        recommendation: moodSuggestions['Calm']
      };
    }

    return { text: "I'm listening. Tell me more about your vibe... is it energetic, nostalgic, or perhaps dreamy?" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="chat-interface"
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', width: '350px', height: '500px',
        backgroundColor: '#FAFAF5', border: '1px solid #1A1A1A', borderRadius: '12px',
        display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        zIndex: 1000, overflow: 'hidden'
      }}
    >
      <div style={{ padding: '1rem', borderBottom: '1px solid #E0E0E0', background: '#1A1A1A', color: '#C5A059', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontFamily: 'Playfair Display' }}>Music Bestie</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FAFAF5', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
      </div>

      <div className="messages" style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{
              padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem', lineHeight: '1.4',
              backgroundColor: msg.sender === 'user' ? '#1A1A1A' : '#E0E0E0',
              color: msg.sender === 'user' ? '#C5A059' : '#1A1A1A',
              borderTopRightRadius: msg.sender === 'user' ? '0' : '8px',
              borderTopLeftRadius: msg.sender === 'bot' ? '0' : '8px'
            }}>
              {msg.text}
            </div>
            {msg.recommendation && (
              <div style={{ marginTop: '0.5rem', padding: '0.5rem', border: '1px solid #C5A059', borderRadius: '4px', fontSize: '0.8rem' }}>
                <strong>Recommendation:</strong><br />
                {msg.recommendation[0].title} - {msg.recommendation[0].artist}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid #E0E0E0', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '0.8rem', border: '1px solid #ccc', borderRadius: '20px', fontFamily: 'Lato', outline: 'none' }}
        />
        <button onClick={handleSend} style={{ background: '#1A1A1A', color: '#C5A059', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}>→</button>
      </div>
    </motion.div>
  );
};

export default Chat;
