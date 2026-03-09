import React, { createContext, useContext, useState, useEffect } from 'react';

const JournalContext = createContext();

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('js-journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('js-journal-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntryData) => {
    const newEntry = {
      ...newEntryData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  // NEW: Update function
  const updateEntry = (id, updatedData) => {
    setEntries((prev) => 
      prev.map((entry) => 
        entry.id === id ? { ...entry, ...updatedData } : entry
      )
    );
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter(entry => entry.id !== id));
  };

  // Don't forget to export the new function in the value prop!
  return (
    <JournalContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry }}>
      {children}
    </JournalContext.Provider>
  );
};