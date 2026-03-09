import React from 'react';
import { Calendar, Trash2, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EntryCard({ entry, onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <span className="mood-icon">{entry.mood}</span>
          <h3 className="card-title">{entry.title}</h3>
        </div>
        
        {/* NEW: Action buttons container */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <Link 
            to={`/edit/${entry.id}`} 
            className="btn-icon" 
            style={{ color: 'var(--primary)' }}
            title="Edit Entry"
          >
            <Edit3 size={18} />
          </Link>
          <button 
            onClick={() => onDelete(entry.id)}
            className="btn-icon"
            title="Delete Entry"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <p className="card-content">
        {entry.content}
      </p>
      
      <div className="card-footer">
        <Calendar size={16} />
        <span>{new Date(entry.date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
    </div>
  );
}