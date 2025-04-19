import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './styles/index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
      <footer className="bg-gray-800 text-white py-4 px-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} EV Population Dashboard</p>
          <p className="text-sm text-gray-400 mt-1">
            Data sourced from Electric Vehicle Population dataset
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;