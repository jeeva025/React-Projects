import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJournal } from './JournalContext';
import { Save, ArrowLeft } from 'lucide-react';

export default function EntryForm() {
  // Grab the id from the URL (if it exists)
  const { id } = useParams();
  const navigate = useNavigate();
  const { entries, addEntry, updateEntry } = useJournal();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '🤩', label: 'Excited' }
  ];

  // NEW: Check if we are editing an existing entry
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      // Find the entry we want to edit
      const entryToEdit = entries.find(entry => entry.id === id);
      
      if (entryToEdit) {
        // Pre-fill the state with the existing data
        setTitle(entryToEdit.title);
        setContent(entryToEdit.content);
        setMood(entryToEdit.mood);
      } else {
        // If someone types an invalid ID in the URL, send them back to the dashboard
        navigate('/');
      }
    }
  }, [id, entries, navigate, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    if (isEditing) {
      // Use the new update function if we are in edit mode
      updateEntry(id, { title, content, mood });
    } else {
      // Otherwise, create a new one
      addEntry({ title, content, mood });
    }
    
    navigate('/'); 
  };

  return (
    <div>
      <button 
        onClick={() => navigate('/')}
        className="btn"
        style={{ color: 'var(--text-muted)', marginBottom: '24px', padding: '0', background: 'none' }}
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="form-container">
        {/* Dynamic Title */}
        <h1 style={{ marginTop: '0', marginBottom: '32px' }}>
          {isEditing ? 'Edit your entry' : 'How are you feeling?'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Mood</label>
            <div className="mood-grid">
              {moods.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMood(m.emoji)}
                  className={`mood-btn ${mood === m.emoji ? 'selected' : ''}`}
                >
                  <span className="mood-emoji">{m.emoji}</span>
                  <span className="mood-label">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Give your entry a title..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Thoughts</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
              placeholder="Start writing..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            <Save size={20} />
            {isEditing ? 'Update Journal Entry' : 'Save Journal Entry'}
          </button>
        </form>
      </div>
    </div>
  );
}