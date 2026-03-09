import React, { useState } from 'react';
import { useJournal } from './JournalContext';
import EntryCard from './EntryCard';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

export default function Dashboard() {
  const { entries, deleteEntry } = useJournal();
  
  // State for the text search
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for the mood filter ('All' means no filter is applied)
  const [selectedMood, setSelectedMood] = useState('All');

  // The available moods matching our EntryForm
  const moods = ['All', '😊', '😌', '😔', '😤', '🤩'];

  // Filter entries by BOTH text and mood
  const filteredEntries = entries.filter((entry) => {
    // 1. Check text match
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesText = 
      entry.title.toLowerCase().includes(lowerCaseQuery) ||
      entry.content.toLowerCase().includes(lowerCaseQuery);
      
    // 2. Check mood match
    const matchesMood = selectedMood === 'All' || entry.mood === selectedMood;
    
    // An entry only shows up if it passes BOTH checks
    return matchesText && matchesMood;
  });

  return (
    <div>
      {/* Header section with Title and Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, paddingTop: '8px' }}>Recent Reflections</h2>
        
        {/* Only show filters if there are entries to filter */}
        {entries.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: '1', justifyContent: 'flex-end' }}>
            
            {/* Search Bar */}
            <div style={{ position: 'relative', minWidth: '250px', flex: '1', maxWidth: '350px' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex' }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ 
                  paddingLeft: '40px', 
                  borderRadius: '8px' 
                }}
              />
            </div>

            {/* Mood Dropdown */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', pointerEvents: 'none' }}>
                <Filter size={18} />
              </div>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '40px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  appearance: 'none',
                  minWidth: '140px'
                }}
              >
                {moods.map(mood => (
                  <option key={mood} value={mood}>
                    {mood === 'All' ? 'All Moods' : `Mood: ${mood}`}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
        )}
      </div>
      
      {/* Conditional Rendering */}
      {entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '2px dashed var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Your journal is waiting for its first entry.</p>
          <Link to="/new" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
            Start writing now &rarr;
          </Link>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'var(--card-bg)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            No entries found matching your filters.
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedMood('All');
            }} 
            className="btn" 
            style={{ color: 'var(--primary)', marginTop: '12px', background: 'none' }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="entries-grid">
          {filteredEntries.map((entry) => (
            <EntryCard 
              key={entry.id} 
              entry={entry} 
              onDelete={deleteEntry} 
            />
          ))}
        </div>
      )}
    </div>
  );
}