import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { JournalProvider } from './JournalContext';
import { BookOpen, PenLine } from 'lucide-react';
import Dashboard from './Dashboard';
import EntryForm from './EntryForm';

export default function App() {
  return (
    <JournalProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          {/* Navigation Bar */}
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <BookOpen size={24} />
                <span className="text-xl font-bold">JS Journal</span>
              </Link>
              <Link 
                to="/new" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <PenLine size={18} />
                <span className="hidden sm:inline">New Entry</span>
              </Link>
            </div>
          </nav>

          {/* Page Content */}
          <main className="max-w-5xl mx-auto px-4 py-8">
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/new" element={<EntryForm />} />
  {/* NEW: Dynamic route for editing */}
  <Route path="/edit/:id" element={<EntryForm />} /> 
</Routes>
          </main>
        </div>
      </BrowserRouter>
    </JournalProvider>
  );
}